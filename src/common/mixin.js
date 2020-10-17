import {debounce} from './utils'
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin={
  data(){
    return{
      ItemImgListener:null
    }
  },
  mounted(){
    //刷新频繁的防抖函数处理
    //只要在delay时间内有调用函数，则清除timer重新设置timer，
    // delay时间重新算，否则超出时间则调用一次函数
    let refresh=debounce(this.$refs.scroll.refresh,100)
    this.ItemImgListener= ()=> {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.ItemImgListener)

  }
}
export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}
