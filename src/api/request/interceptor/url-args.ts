import type { AxiosRequestConfig } from 'axios'
import type { RequestConfig } from '..'

const urlArgsHandler = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { url, args } = config as RequestConfig
      if (args) {
        const lostParams: string[] = []
        const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
          if (!args[arg]) {
            lostParams.push(arg)
          }
          return args[arg] as string
        })
        if (lostParams.length) {
          return Promise.reject({
            message: 'Not Found Args: ' + lostParams.join(', '),
            config: config as RequestConfig,
          })
        }
        return { ...config, url: replacedUrl }
      }
      return config
    },
  },
}

export default urlArgsHandler
