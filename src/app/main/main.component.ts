import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, takeWhile, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    isCollapsed = false;
    menu = [
        { text: '概览', icon: 'dashboard', url: '/main/dashboard', sub: false },
        { text: '组织管理', icon: 'cluster', url: '/main/organization', sub: false },
        { text: '账号管理', icon: 'team', url: '/main/manage', sub: false },
        { text: '角色管理', icon: 'audit', url: '/main/rule', sub: false },
        {
            text: '系统设置', icon: 'setting', sub: true, children: [
                { text: '通知设置', icon: '', url: '/main/notice', sub: false, },
                { text: '系统设置', icon: '', url: '/main/setIcon', sub: false, }
            ]
        },
        {
            text: '个人中心', icon: 'user', sub: true, children: [
                { text: '预留信息', icon: '', url: '/main/notice', sub: false, },
                { text: '修改密码', icon: '', url: '/main/setIcon', sub: false, }
            ]
        },
    ];

    currentModule: any;
    private lifeCycle = true;
    constructor(private router: Router, private notification: NzNotificationService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.currentModule = this.determineCurrentModule(location.href.split('#')[1]);
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            takeWhile(() => this.lifeCycle)
        ).subscribe((evt: any) => {
            document.body.scrollTop = 0;
            this.currentModule = this.determineCurrentModule(evt.url);
        });
    }

    ngOnDestroy() {
        this.lifeCycle = false;
    }
    navigate(menuItem: any) {
        this.router.navigate([menuItem.url]);
    }

    isMySub(group: any) {
        return this.currentModule && group.children.some(c => c.url === this.currentModule.url);
    }
    private determineCurrentModule(url: string) {
        let current: any = this.menu.find(m => url.indexOf(m.url) >= 0);
        if (!current) {
            current = this.menu.filter(m => m.sub).map(m => m.children).reduce((prev, val) => {
                return [...prev, ...val];
            }, []).find(m => url.indexOf(m.url) >= 0);
        }
        return current;
    }
}
