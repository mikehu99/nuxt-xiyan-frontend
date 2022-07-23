<template>
  <div class="container">
    <waterfall
      :col="col"
      :data="youtuberList"
      :width="itemWidth"
      :gutterWidth="gutterWidth"
    >

      <div v-for="(youtuber, index) in youtuberList" class="card youtuber-box">
        <div class="card-content">
          <div class="media" @click="youtuberDetail(youtuber)">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="youtuber.avatar" style="height: 48px"/>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{youtuber.youtuberName}}</p>
            </div>
          </div>
          <div class="content">
            {{youtuber.description}}<a>@{{youtuber.adderName}}</a>.

            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
          <div v-for="category in youtuber.categories">
            {{category.categoryName}}
          </div>
        </div>
      </div>
    </waterfall>
    <pagination
      v-show="page.total > 0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="init"
    />
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination';
  import YoutuberSkeleton from '@/components/Skeleton/YoutuberSkeleton';

  export default {
    name: 'YoutuberList',
    components: {Pagination, YoutuberSkeleton},
    data() {
      return {
        loading: true,
        col: 3,
        media: 9,
        youtuberList: [],
        page: {
          current: 1,
          size: 10,
          total: 0,
          tab: 'latest'
        }
      }
    },
    computed: {
      itemWidth() {
        if (process.client) {
          let mediaWidth = document.getElementsByClassName('container')[0].clientWidth;
          if (mediaWidth < 759) {
            return document.getElementsByClassName('container')[0].clientWidth;
          } else {
            return 244 * 0.5 * (document.getElementsByClassName('container')[0].clientWidth / 375);
          }
        }
      },
      gutterWidth() {
        if (process.client) {
          let mediaWidth = document.getElementsByClassName('container')[0].clientWidth;
          if (mediaWidth < 759) {
            return 0;
          } else {
            return (9 * 0.5 * (document.getElementsByClassName('container')[0].clientWidth / 375))	//#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
          }
        }
      }
    }
    ,
    mounted() {
      this.init('latest')
    }
    ,
    methods: {
      async init(tab) {
        this.loading = true;
        let data = await
          this.$api.youtuber.getList(this.page.current, this.page.size, tab);
        this.page.current = data.current;
        this.page.total = data.total;
        this.page.size = data.size;
        this.youtuberList = data.records;
        this.loading = false;
      }
      ,
      youtuberDetail(youtuber) {
        this.$router.push({path: `/community/${youtuber.id}`})
      }
    }
  }
</script>
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .youtuber-box {
    margin-bottom: 1px;
  }

  .vue-waterfall {
    min-height: 500px;
  }

  @media (min-width: 768px) {
    .youtuber-box {
      margin-bottom: 10px;
    }
  }

</style>
