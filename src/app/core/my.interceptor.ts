import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpInterceptor,
    HttpResponseBase,
    HttpErrorResponse
} from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

const CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    private get notification(): NzMessageService {
        return this.injector.get(NzMessageService);
    }

    private goTo(url: string) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    private checkStatus(event: HttpResponseBase) {
        if ((event.status >= 200 && event.status < 300) || event.status === 401) {
            return;
        }

        const errortext = CODEMESSAGE[event.status] || event.statusText;
        this.notification.error(`请求错误 ${event.status}: ${event.url}`, errortext);
    }

    private handleData(event: HttpResponseBase): Observable<any> {
        this.checkStatus(event);
        switch (event.status) {
            case 200:
                if (event instanceof HttpResponse) {
                    const body: any = event.body;                    
                    const { code, message, data } = body;

                    if (code !== 1) {
                        this.notification.error(message || '请求系统异常');
                        return throwError({ error: { code, message } });
                    }

                    return of(new HttpResponse(Object.assign(event, { body: data })));
                }
                break;
            case 401:
                this.notification.error(`未登录或登录已过期，请重新登录。`);
                this.goTo('/login');
                break;
            case 403:
            case 404:
            case 500:
                this.goTo(`/exception/${event.status}`);
                break;
            default:
                if (event instanceof HttpErrorResponse) {
                    console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', event);
                    return throwError(event);
                }
                break;
        }
        return of(event);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = req.url;
        const newReq = req.clone({ url: `${url}` });

        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                if (event instanceof HttpResponseBase) {
                    return this.handleData(event);
                }
                return of(event);
            })
        );
    }
}
