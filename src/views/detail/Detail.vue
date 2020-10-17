<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="titlenav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods1"></detail-base-info>
      <detail-shop></detail-shop>
      <detail-goods-info></detail-goods-info>
      <detail-param-info ref="param"></detail-param-info>
      <detail-comment-info ref="comment"></detail-comment-info>
      <div class="gl">
        <p>这里是用goodslist组件</p>
        <p>传输的还是图片，注意goodlistitem组件中img的属性</p>
        <p>最好使用计算属性computed</p>
        <p>当组件完成后会发出加载完成事件，要取消home的全局事件this.$bus.$off</p>
        <p>在Detail中重新处理itemImageLoad事件，注意要引入防抖函数，和获取scroll中的refresh重新计算scrollheight</p>
        <p>同理在离开该页面时也取消全局事件监听this.$bus.$off</p>
        <p>2个组件在mounted里面的操作完全相同，可以抽取到mixin（混入）中</p>
      </div>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import {Goods} from "@/network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShop from "./childComps/DetailShop";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import {debounce} from "common/utils";
import DetailBottomBar from "./childComps/DetailBottomBar";
import {backTopMixin} from "common/mixin";
// import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  mixins:[backTopMixin],
  data() {
    return {
      itemid: null,
      topImages: ['https://s5.mogucdn.com/mlcdn/c45406/200621_364545lhiifab79a445684kjk5346_5999x5999.jpg_750x1000.v1cAC.81.jpg',
        'https://s5.mogucdn.com/mlcdn/c45406/200621_7l99e9k06cfbf9lj04f84253b3686_5999x5999.jpg_750x1000.v1cAC.81.jpg',
        'https://s5.mogucdn.com/mlcdn/c45406/200621_364545lhiifab79a445684kjk5346_5999x5999.jpg_750x1000.v1cAC.81.jpg'],
      goods: {
        title: '2020夏季新款宽松显瘦条纹衬衫+休闲九分裤两件套大码女套装',
        price: '￥39.90',
        oldPirce: '￥57.00',
        discountDesc: '活动价',
        columns: ['销量12341', '收藏33人', '退货补运费'],
        desc: '新款上市',
        lowNowPrice: '30.00',
        services: ['7天无理由退货', '72小时发货']
      },
      goods1: {},
      detailTopY: [],
      getdetailTopY: null,
      currentIndex: 0,
      message:'',
      show:false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  created() {
    // console.log('created')
    this.itemid = this.$route.params.id
    //调用封装的函数，传入id，获取数据，
    //获取商品参数
    this.goods1 = new Goods(this.goods)
    //获取店铺参数（略）
    //保存商品的详情数据（略）
    // console.log("act")
    //给定位操作进行防抖
    this.getdetailTopY = debounce(() => {
      this.detailTopY = []
      this.detailTopY.push(0)
      this.detailTopY.push(this.$refs.param.$el.offsetTop)
      this.detailTopY.push(this.$refs.comment.$el.offsetTop)
      this.detailTopY.push(document.querySelector('.gl').offsetTop)
      this.detailTopY.push(Number.MAX_VALUE)
    }, 100)
    //理解：nextTick()，是将回调函数延迟在下一次dom更新数据后调用，
    // 简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数，
    this.$nextTick(() => {
      //图片依然还是没有加载完，offsetTop的值还是不对（但是我这里没有图片）
      this.getdetailTopY();
    })
    // console.log(this.detailTopY)
  },
  methods: {
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.detailTopY[index], 500)
    },
    imgload() {
      //监听图片加载完后调用，得到定位，并利用防抖提高性能，并且刷新scrollheight
    },
    contentScroll(position) {
      const positionY = -position.y
      // console.log(positionY)
      // console.log(this.detailTopY)
      for (let i = 0; i < this.detailTopY.length - 1; i++) {
        if (this.currentIndex != i && (positionY >= this.detailTopY[i] && positionY < this.detailTopY[i + 1])) {
          this.currentIndex = i;
          this.$refs.titlenav.currentIndex = this.currentIndex
          // console.log(this.currentIndex)

        }
      }
      //是否显示回到顶部
      this.isShowBackTop=-position.y >800
    },
    addToCart(){
      // console.log('sdsd')
      //1.获取购物车需要展示的信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.price
      product.iid=this.itemid

      //把商品对象存入state中的cartList里
      //也可以使用mapActions的映射关系，methods中放入......mapActionss(['addCart'])
      //this.addCart(product).then()
      this.$store.dispatch('addCart',product).then(res=>{
        // this.show=true;
        // this.message=res
        // // console.log(res);
        // setTimeout(()=>{
        //   this.show=false;
        //   this.message=''
        // },1500)
        this.$toast.show(res,1500)
      })

    }
  }
}

</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  overflow: hidden;
  height: calc(100% - 44px - 49px);
}

.gl {
  height: 800px;
  background-color: cornflowerblue;
}
</style>
