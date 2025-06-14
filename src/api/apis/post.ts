import makeRequest from '../request'

const method = 'post'

export default {
  // 测试接口, 实际需要自己写
  '/register': makeRequest<null, { username: string; password: string }>({
    url: '/register',
    method,
  }),
}
