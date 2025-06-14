import type { AxiosRequestConfig } from 'axios'
import type { RequestConfig } from '..'

const authHandler = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { isAuth, headers } = config as RequestConfig
      if (isAuth) {
        // TODO 在请求头中加入 token
        // 需要tokens但是又没有的时候：
        // return return Promise.reject({
        //   message: 'Not Found Auth Token',
        //   code: 'REQUEST_INTERCEPTOR_ERROR',
        //   config: config as RequestConfig,
        // })
        // @ts-expect-error 压制警告
        headers.Authorization = 'Token'
      }
      return config
    },
  },
}

export default authHandler
