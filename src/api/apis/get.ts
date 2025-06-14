import makeRequest from '../request'

export default {
  '/allUrl': makeRequest<undefined>({
    url: 'https://another-domain.com/some/endpoint',
    desc: '全路径测试',
  }),
  // 测试接口, 实际需要自己写
  '/test': makeRequest<undefined>({
    url: '/test/{asc}/{asx}',
    desc: '测试接口',
  }),
  '/admins': makeRequest<{ admins: string[] }>({
    url: '/admins',
  }),
  '/account/{username}': makeRequest<
    { id: string; name: string; role: string },
    undefined,
    undefined,
    { username: string }
  >({
    url: '/account/{username}',
  }),
}
