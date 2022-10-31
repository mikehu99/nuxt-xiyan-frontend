<template>
  <div class="pin-image-row middle-row">
    <div class="image-box-wrapper image-box">
      <div :class="[colNum,'image-box']" :style="{display:MinDisplay}">
        <div v-for="(img,index) in imgs" class="pin-img" :key='img'>
          <img @click="ZoomIn(index)"
               :src="img+imageRule"
               :class="['image',{'one-img':imgs.length == 1}]"/>
        </div>
      </div> <!----> <!---->

      <div class="max" :style="{display:display}">
        <div @click="ZoomOut($event)" v-for="(img,index) in imgs" :key='img' :class="[index===ShowIndex?'active':'None']"><img
          :src="img" width="100%"></div>
        <div class="small">
          <img :class="{'smallActive':index===ShowIndex}" v-for="(img,index) in imgs" :key='img' @click="select(index)"
               :src="img+imageRule" class="thumb"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "PicList",
    props: {
      imgs: {
        type: Array
      }
    },
    data: function () {
      return {
        ShowIndex: 0,
        display: 'none',
        MinDisplay: 'flex',
        //Vue模板中使用v-for循环渲染图片时不能直接使用图片文件本地位置
      };
    },
    computed: {
      colNum() {
        let size = this.imgs.length
        if (size === 1) {
          return 'column-1';
        } else {
          return 'column-3'
        }
      },
      imageRule(){
        let size = this.imgs.length;
        if (size === 1) {
          return '?x-oss-process=image/auto-orient,1/quality,q_60/format,webp';
        } else {
          return '?x-oss-process=image/auto-orient,1/resize,p_50/quality,q_24/sharpen,100/format,webp'
        }
      }
    }
    ,
    methods: {
      ZoomIn(i) {
        this.display = 'block';
        this.MinDisplay = 'none';
        this.ShowIndex = i;
      }
      ,
      ZoomOut(event) {
        this.display = 'none';
        this.MinDisplay = 'flex';
        if (process.client) {
         let item = event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
         let picDistance = event.currentTarget.getBoundingClientRect().top;
         let top = item.getBoundingClientRect().top;
         if (picDistance<60){
           window.scrollBy(0,-(60 - top));
         }
        }
      }
      ,
      select(i) {
        this.ShowIndex = i;
      }
    }
  }
</script>
<style scoped>
  .pin-image-row {
    margin-top: 8px;
    margin-bottom: 20px !important;
  }

  .middle-row {
    position: relative;
    margin: 8px 0 0 60px;
  }

  .image-box {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
  }

  .image-box.column-3 {
    width: 398px;
  }

  .pin-img {
    position: relative;
    width: auto;
  }

  .image-box.column-3 .image:not(:nth-child(3n)) {
    margin-right: 4px;
  }

  .image-box.column-3 .image {
    width: calc(33.33333% - 2.66667px);
    max-width: 7.857rem;
    max-height: 110px;
  }

  .image {
    flex: 0 1 auto;
    margin-top: 4px;
    max-width: 100%;
    min-width: 110px;
    cursor: zoom-in;
    min-height: 110px;
    max-height: 270px;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .image-box.column-1 .image.one-img {
    border-radius: 4px;
  }

  .image-box.column-1 .image {
    width: 264px;
  }

  .SongList {
    width: 40%;
  }

  .covers {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .cover {
    display: flex;
    justify-content: center;
    width: 33%;
    margin: 10px 0;
  }

  .min {
    border-radius: 10px;
    cursor: zoom-in;
  }

  .max {
    cursor: zoom-out;
    width: 100%;

  }

  .small {
    margin-top: 8px;
    font-size: 0;
  }

  .thumb {
    position: relative;
    border: 2px solid transparent;
    box-sizing: border-box;
    opacity: .6;
    transition: .2s;
    width: 10%;
    cursor: pointer;
    overflow: hidden;
    -o-object-fit: cover;
    object-fit: cover;
    margin-left: 1%;
  }

  .thumb:hover {
    opacity: 1;
  }

  .active {
    display: flex;
  }

  .None {
    display: none;
  }

  .smallActive {
    opacity: 1;
  }

  @media (max-width: 600px) {
    .middle-row {
      margin-left: 0rem;
      margin-right: 0rem;
    }
    .image{
      margin-top: 0px;
    }

    .image-box.column-3 .image {
      position: absolute;
      min-width: 100%;
      min-height: 100%;
    }


    .image-box.column-3 .pin-img {
      width: calc(33.3333% - 0.2rem);
      padding-bottom: calc(33.3333% - 0.2rem);
      position: relative;
      overflow: hidden;
      margin-bottom: 0.3rem;
    }
    .image-box.column-3 .pin-img:not(:nth-child(3n)){
      margin-right: 0.3rem;
    }
  }

</style>
