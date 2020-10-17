<template>
<div class="bottom-bar">
  <div class="left-item">
    <div class="l-item" id="kefu">
      客服
    </div>
    <div class="l-item" id="dianpu">
      店铺
    </div>
    <div class="l-item" id="shoucang">
      收藏
    </div>
  </div>
  <div class="right-item">
    <div class="r-item" id="cart" @click="addToCart">
      加入购物车
    </div>
    <div class="r-item" id="buy">
      购买
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "DetailBottomBar",
  methods:{
  addToCart(){
    this.$emit('addCart')
  }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 49px;
    background: #fff;
    position: relative;
    display: flex;
  }
  .left-item,.right-item{
    height: 49px;
    flex:1;
    display: flex;
  }
  .left-item{
    font-size:10px;
  }
  .l-item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items:flex-end;
    padding-bottom: 4px;
    position: relative;
  }
  .l-item:after{
    content: '';
    position: absolute;
    top:8px;
    width: 22px;
    height: 22px;
    background: url(~assets/img/detail/detail_bottom.png) 0 1px/100%;
  }
  #kefu:after{
    background: url(~assets/img/detail/detail_bottom.png) 0 -53px/100%;
  }
  #dianpu:after{
    background: url(~assets/img/detail/detail_bottom.png) 0 -98px/100%;
  }
  .r-item{
    font-size: 14px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #cart{
    background: yellow;
    color: black;
  }
  #buy{
    background-color: var(--color-tint);
    color:#fff
  }

</style>
