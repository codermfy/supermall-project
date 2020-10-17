import {
  ADD_COUNTER,
  ADD_To_Cart
} from "./mutation-types";

export default {
  //mutations唯一目的就是修改state状态
  //mutations中的每一个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_To_Cart](state,payload){
    state.cartList.push(payload)
  }
}
