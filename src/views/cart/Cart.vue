<template>
<div class="cart">
  <!--导航-->
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
<!--  商品列表-->
  <scroll class="content" ref="scroll">
    <cart-list></cart-list>
  </scroll>

<!--  底部汇总-->
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";
import CartBottomBar from "./childComps/CartBottomBar";
import CartList from "./childComps/CartList";
	export default {
		name:"Cart",
    components:{
		  NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed:{
		  // cartLength(){
		  //   return this.$store.getters.cartLength
      // }
      //2种方法，一个使用原来名字(数组写法)，一个使用自定义名字(对象写法)
      // mapGetters把vuex中的getters映射
      ...mapGetters(['cartLength'])
      // ...mapGetters({
      //   length:'cartLength'
      // })
    },
    activated() {
		  this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background: var(--color-tint);
  color: #fff;
}
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
