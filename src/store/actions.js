import {
  ADD_COUNTER,
  ADD_To_Cart
} from "./mutation-types";

export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct=null;
      //payload新添加的商品
      for(let item of context.state.cartList){
        if(item.iid===payload.iid){
          oldProduct=item
        }
      }
      if(oldProduct){
        // oldProduct.count+=1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else{
        payload.count=1
        payload.checked=true
        context.commit(ADD_To_Cart,payload)
        resolve('添加了新的商品')
      }
      }
    )
  }
}
