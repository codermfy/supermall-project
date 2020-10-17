<template>
  <div class="toast" v-show="isshow">
    <div >{{ message }}</div>
  </div>
</template>

<script>

export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show:{
    //   type:Boolean,
    //   default: false
    // }
  },
  data(){
    return{
      message:'',
      isshow:false,
      timer:null
    }
  },
  methods:{
    show(message='undefined',duration=1500){
      clearTimeout(this.timer)
      this.isshow=true
      this.message=message
      this.timer=setTimeout(()=>{
        this.isshow=false
        this.message=''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 4px;
  padding: 8px 10px;
  color:#fff;
  background: rgba(0,0,0,0.75);
  z-index:999
}
</style>
