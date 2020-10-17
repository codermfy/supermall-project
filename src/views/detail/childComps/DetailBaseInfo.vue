<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">
      <p>{{ goods.title }}</p>
    </div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPirce }}</span>
      <span class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span v-for="item in goods.columns" class="info-item">{{ item }}</span>
    </div>

    <div class="info-service">
    <span v-for="sv in goods.services" class="service-item">
      <img src="~assets/img/common/true.svg" alt="">
      <span>{{ sv }}</span>
    </span>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  activated() {
    // console.log(this.goods)
  }
}
</script>

<style scoped>
.base-info{
  /*border-bottom: 8px solid rgba(100,100,100,.1);*/
}
.info-title{
  margin-top: 5px;
  padding: 4px;
  color:#000
}
.info-price{
  margin-top: 4px;
}
.n-price{
  font-size: 20px;
  color:var(--color-tint);
  margin-right: 4px;
}
.o-price{
  font-size: 10px;
  text-decoration: line-through;
  margin-right: 4px;
}
.discount{
  background-color: var(--color-high-text);
  font-size: 10px;
  padding: 2px;
  border-radius: 10px;
  color:#fff;
  position: relative;
  top:-6px
}
.info-other{
  margin-top: 10px;
  display: flex;
  font-size: 10px;
  justify-content: space-between;
  border-bottom: 3px solid rgba(100,100,100,0.1);
}
.info-item{
  margin: 4px;
}
.info-service{
  color:#000000;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 6px solid rgba(100,100,100,0.1);

}
.service-item{
  margin: 4px;
}
.service-item img {
width: 10px;
  height: 10px;
  vertical-align: middle;
}
.service-item span{
  vertical-align: middle;
}
</style>
