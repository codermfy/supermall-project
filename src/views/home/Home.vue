<template>
	<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isfixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
    <home-swiper :banners="banners" @imageloaded="imageLoaded"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                  ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
	</div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
		name:"Home",
    components:{
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
		  return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'news':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShow:false,
        taboffsetTop:0,
        isfixed:false,
        saveY:0
      }
    },
    computed:{
		  showGoods(){
		    return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
		  this.saveY=this.$refs.scroll.getScrollY()
    },
    created() {
		  //1.请求多个数据
      this.getHomeMultidata()
      //2.监听商品
      this.getHomeGoods('pop')
      this.getHomeGoods('news')
      this.getHomeGoods('sell')
      //3.监听item中图片加载完成
      //在created里面用refs很可能是获取不到的，因为还没加载出来
      //需要放在mounted里面

    },
    mounted(){
		  //刷新频繁的防抖函数处理
      //只要在delay时间内有调用函数，则清除timer重新设置timer，
      // delay时间重新算，否则超出时间则调用一次函数
      const refresh=debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })

    },
    methods:{
		  //事件监听相关方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='news'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        this.isShow=-position.y >1000
        this.isfixed=-position.y >this.taboffsetTop
      },
      loadMore(){
        // console.log("1111111111")
        this.getHomeGoods(this.currentType)

      },
      imageLoaded(){
        this.taboffsetTop=this.$refs.tabControl2.$el.offsetTop
        // console.log(this.taboffsetTop)
      },
		  //网络请求相关方法
		  getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
		    const page=this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res)
          // console.log(this.goods[type].list)
          this.goods[type].page+=1
          // this.$refs.scroll.scroll.refresh()
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;

    /*padding-top: 44px;*/
    /*padding-bottom: 50px;*/
    /*position: relative;*/
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
    /*使用原生滚动时，为了让导航不一起滚动*/
    /*position: fixed;*/
    /*z-index: 11;*/
    /*left:0;*/
    /*right:0;*/
    /*top:0;*/
  }
  .tab-control{
    /*使用了better-scroll后以下样式失效*/
    /*position: sticky;*/
    /*top:44px;*/
    /*z-index: 8;*/
  }
  .tab-control{
    position: relative;
    z-index:15
  }
  /*.content{*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left:0;
    right:0;
  }
</style>
