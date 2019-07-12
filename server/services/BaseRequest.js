import r from 'request-promise-native';
import { logger } from '~/util/logger';
import { ServerUrl } from '~/util/constants';
import { removePrefix } from '../routes/util/util';

const RequestErrorCodes = ['ETIMEDOUT', 'ECONNREFUSED'];

export class BaseRequest {
  constructor(ctx) {
    this.context = ctx;
  }

  /**
   * Make a request, based on `request`. If this method doesn't support your request options, use `request`.
   * @param {string} url relative request url
   * @param {Object} options request options contains request body, headers and bla bla
   * @param {Object} options.data request body, use json serialize
   * @param {Object} options.form request body, use form serialize. If both `data` and `form` specified, use `data`.
   * @param {Object} options.headers request headers
   * @param {Object} options.context context that contains accessToken or bla, bla, bla
   * @param {string} options.context.accessKeyId
   * @param {string} options.context.securityKeyId
   * @param {string} [options.baseUrl=ServerUrl] request base url, default is `ServerUrl` in `~/util/constants`
   * @param {string} [options.method='POST'] request method default POST
   *
   * @return {Promise}
   */
  request(url, {
    data,
    form,
    headers = {},
    context = this.context || {},
    baseUrl = ServerUrl,
    method = 'POST'
  } = {}) {
    const { ticket } = context;
    const datetime = new Date().getTime();

    Object.assign(headers, {
      accept: '*/*',
      Datetime: datetime
    });

    if (ticket) {
      Object.assign(headers, { ticket });
    }

    const requestOptions = {
      url: removePrefix(url),
      baseUrl: baseUrl,
      method: method,
      headers: headers,
      json: true
    };

    if (data != null) {
      requestOptions.body = data;
    }
    else if (form != null) {
      requestOptions.form = form;
    }

    return r(requestOptions)
      .then(this.transformSuccessResponse(requestOptions), this.transformErrorResponse(requestOptions));
  }

  transformSuccessResponse(requestOptions) {
    return function (data) {
      logger.info({
        responseBody: data,
        requestOptions: requestOptions
      }, `request finished: %s`, `${requestOptions.baseUrl}${requestOptions.url}`);

      const { code, msg } = data;

      return {
        code: code,
        message: msg,
        data: data.data
      };
    };
  }

  transformErrorResponse(requestOptions) {
    return function (resp) {
      // if have statusCode, it responsed other than 2xx
      const { statusCode, name, options } = resp;
      logger.error({
        response: resp,
        requestOptions: requestOptions
      }, 'request error: `%s`', `${options.baseUrl}${options.url}`);

      if (statusCode) {
        return {
          error: {
            code: statusCode,
            message: name
          }
        };
      }

      const { code } = resp.error;
      if (RequestErrorCodes.indexOf(code) > -1) {
        return {
          error: {
            code,
            name
          }
        };
      }

      return resp;
    };
  }
}
