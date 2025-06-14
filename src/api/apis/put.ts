import makeRequest from '../request'

const method = 'put'
export default {
  // 测试接口, 实际需要自己写
  '/password': makeRequest<null, { password: string }, { username: string }>({
    url: '/password',
    method,
  }),
}
