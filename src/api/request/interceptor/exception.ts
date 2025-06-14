import type { RequestConfig } from '..'
import { AxiosError, type AxiosResponse } from 'axios'
import { HTTP_ENUMS } from '../httpEnums'

const exception = {
  request: {
    onFulfilled: async (config: RequestConfig) => {
      return config
    },
    onRejected: (error: AxiosError<unknown>) => {
      return error
    },
  },
  response: {
    onFulfilled: (response: AxiosResponse<unknown>) => {
      return response
    },
    onRejected: (error: AxiosError<unknown>) => {
      const { response } = error
      if (!!response) {
        // TODO 状态码类错误
        let message = ''
        switch (response.status) {
          case HTTP_ENUMS.HTTP_STATUS.REQUEST_ERROR.BadRequest:
            message = 'Bad Request：客户端发送的请求有误'
            break
          case HTTP_ENUMS.HTTP_STATUS.REQUEST_ERROR.UnAuthorized:
            message = 'Unauthorized：请求需要身份验证，但没有提供有效的凭据'
            break
          case HTTP_ENUMS.HTTP_STATUS.REQUEST_ERROR.Forbidden:
            message = 'Forbidden：服务器拒绝访问请求的资源'
            break
          case HTTP_ENUMS.HTTP_STATUS.REQUEST_ERROR.NotFound:
            message = 'Not Found：请求的资源不存在'
            break
          case HTTP_ENUMS.HTTP_STATUS.SERVER_ERROR.InternalServerError:
            message = 'Internal Server Error：服务器内部错误，无法完成请求'
            break
          default:
            message = 'Error：未知错误'
        }
        response.statusText = message
        console.error(message)
      } else {
        // 发生在前置过滤器报错，网络错误等时机
        console.error(error.message)
      }
      return Promise.reject(error)
    },
  },
}

export default exception
