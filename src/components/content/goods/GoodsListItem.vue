<template>

  <div class="goods-item" @click="itemClick">
    <img v-lazy="goodsItem.img" alt="" @load="imageLoad">
    <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{'￥'+goodsItem.price.toFixed(2)}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      //监听图片加载完成
      // console.log("1")
      //使用事件总线$bus来发射事件，Home中获取事件并执行refresh
      //涉及非父子组件的通信，我们选择了事件总线
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.tradeItemId)
      // console.log(this.$router);
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  /*margin-bottom: 40px;*/
  position: relative;
  width: 48%;
  /*break-inside: avoid*/
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
  height: 227.54px;
  /*border:3px solid var(--color-tint);*/
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
