<template>
<div class="bottom-bar">
  <div class="check-all">
    <check-button class="checkbt" @click.native="checkClick" :is-checked="isSelectAll"></check-button>
    <span>全选</span>
  </div>
  <div class="total">
    合计:{{'￥'+totalPrice.toFixed(2)}}
  </div>
  <div class="jiesuan" @click="calcClick">
    结算({{checkednum}})
  </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item =>{
        return item.checked
      }).map(item=>{
        return parseFloat(item.price.replace('￥',''))*item.count
      }).reduce((pre,item)=>{
        return pre+item
      },0)
    },
    checkednum(){
      return this.cartList.filter(item =>{
        return item.checked
      }).length
    },
    isSelectAll() {
      if(this.cartList.length===0) return false
      // return !this.cartList.filter(item=>!item.checked).length
      return !this.cartList.find(item => !item.checked);

    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }
      else{
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',1500)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background: #fff;
  display: flex;
}
.check-all{
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2px;
}
.checkbt{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.check-all span{
  font-size: 12px;
}
.total{
  flex: 2;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.jiesuan{
  flex: 1;
  background:#FF5200 ;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
}
</style>
