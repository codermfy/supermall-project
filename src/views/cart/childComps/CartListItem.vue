<template>
<div class="check-list-item">
  <div class="checkBtn">
  <check-button class="ckbt" @click.native="checkClick" :is-checked="product.checked"></check-button>
  </div>
  <div class="item-image">
    <img :src="product.image" alt="">
  </div>
  <div class="item-info">
    <div class="title">
      <p>{{ product.title }}</p>
    </div>
    <div class="desc">
      {{product.desc}}
    </div>
    <div class="price-info">
      <span class="price">
        {{product.price}}
      </span>
      <span class="count">
        <button @click="descount" :disabled="product.count<=1">-</button>
        {{product.count}}
        <button @click="addcount">+</button>
      </span>
    </div>
  </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
name: "CartListItem",
  components:{
    CheckButton
  },
  props:{
  product:{
    type:Object,
    default(){
      return {}
    }
  }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    },

    addcount() {
      this.product.count++
    },
    descount() {
      if (this.product.count > 1) {
        this.product.count--
      }
    }
  }
}
</script>

<style scoped>
.check-list-item{
  height: 120px;
  display: flex;
  background: #fff;
  border-bottom: 2px solid #aaa;
}
.checkBtn{
  /*border: 1px solid black;*/
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}
.ckbt{
  width: 20px;
  height: 20px;
}
.item-image{
  /*border: 1px solid black;*/
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
}
.item-image img{
  border-radius: 6px;
  height: 100px;
  width: 100%;
}
.item-info{
  /*border: 1px solid black;*/
  flex: 10;
  padding: 10px;
}
.title p{
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: black;
  margin-bottom: 20px;
}
.desc{
  font-size: 12px;
  margin-bottom: 25px;
}
.price-info{
  position: relative;
}
.price{
color:var(--color-tint)
}
.count{
  position: absolute;
  right:10px
}
.count button{
  width: 20px;
  height: 20px;
  background: #aaa;
  border: 1px solid black;
  background: #fff;
}
</style>
