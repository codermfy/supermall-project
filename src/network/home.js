import {request,request_local} from "./request";

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
export function getHomeGoods(type,page){
  let url='/'+type+'/data'+page+'.json'
  return request_local({
    url,
  })
}
