import get from './apis/get'
import post from './apis/post'
import put from './apis/put'
import deleteApis from './apis/delete'

const apis = {
  get,
  post,
  put,
  delete: deleteApis,
}

export default apis
