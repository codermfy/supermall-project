import axios from 'axios'
//封装
export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 100000
  })
  //2.axios的拦截器
  //配置拦截后需要返回配置
  //请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config)
    //1.config中一些信息不符合服务器的要求
    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err)
  })
  //响应拦截
  //数据拦截后需要返回数据
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })

  //3.发送真正网络请求 instance也是Promise
  return instance(config)
}
export function request_local(config){
  const instance = axios.create({
    baseURL: '/data',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data.result.wall.docs
  }, err => {
    console.log(err)
  })
  return instance(config)
}
