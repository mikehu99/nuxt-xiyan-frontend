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
          <nuxt-link :to="`/ytber/${youtuber.id}`">
            <div class="media" style="cursor: pointer">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="youtuber.avatar" style="height: 48px"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ youtuber.youtuberName }}</p>
              </div>
            </div>
          </nuxt-link>
          <div class="description">
            {{ youtuber.description }}
          </div>
          <ul>
            <li v-for="category in youtuber.categories"
                :class="[$route.params.id == category.id?'chosen tag':'ytb-tag tag']"
                @click="changeCategory(category.id)">
              # {{ category.categoryName }}
            </li>
          </ul>
          <div class="bottom-info">
            <span>
              <span style="color: #0079d3">post by </span>
              <nuxt-link :to="`/member/${youtuber.adderId}`">
                @{{ youtuber.adderName }}
              </nuxt-link>
              <time :datetime="youtuber.createTime">{{ youtuber.createTime | timeFormat }}</time>
            </span>
            <template v-if="youtuber.ymsPraise != null && youtuber.ymsPraise.status == 1">
              <el-tooltip class="item" effect="dark" content="取消点赞" placement="top">
              <span>
                <i class="iconfont icon-dianzan_kuai ytb-dianzan blue"
                   @click="praise(youtuber)"></i> {{ youtuber.thumbUp }}
              </span>
              </el-tooltip>
            </template>
            <template v-else>
              <el-tooltip class="item" effect="dark" content="点赞TA" placement="top">
              <span>
                <i class="iconfont icon-31dianzan ytb-dianzan" @click="praise(youtuber)"></i> {{ youtuber.thumbUp }}
              </span>
              </el-tooltip>
            </template>
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
import Pagination from '~/components/Pagination';
import {showtime} from "assets/js/date"
import {mapGetters} from "vuex";

export default {
  name: 'YoutuberList',
  components: {Pagination},
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
        tab: 'latest',
        categoryId: this.$route.params.id
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        this.page.categoryId = toParams.id;
        this.page.current = 0;
        this.init('latest')
      }
    );
  },
  filters: {
    timeFormat(value) {
      return showtime(value)
    },
  },
  computed: {
    ...mapGetters(['token', 'user']),
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
        this.$api.youtuber.getList(this.page.current, this.page.size, tab, this.page.categoryId);
      this.page.current = data.current;
      this.page.total = data.total;
      this.page.size = data.size;
      this.youtuberList = data.records;
      this.loading = false;
    },
    changeCategory(id) {
      this.$router.push({path: `/ytber/category/${id}`})
    },
    praise(youtuber) {
      if (this.token == null || this.token === '') {
        this.$message({message: '该功能需要登录', type: 'error', showClose: true});
        this.$store.commit('common/setLoginFlag', true);
        return false;
      }
      this.$api.youtuber.praise({youtuberId: youtuber.id}).then(data => {
        if (data.status === 1) {
          this.$message.success('点赞成功')
          youtuber.thumbUp++;
          youtuber.ymsPraise = data;
        }
        if (data.status === -1) {
          this.$message.success('取消点赞成功')
          youtuber.thumbUp--;
          youtuber.ymsPraise.status = -1;
        }
      })
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

.chosen {
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  color: #0079d3;
}

.description {
  font-size: 14px;
  margin-top: 8px;
}

.ytb-tag {
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
}

.ytb-tag:hover {
  color: #0079d3;
}

.ytb-dianzan {
  cursor: pointer;
}

.bottom-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
}


@media (min-width: 768px) {
  .youtuber-box {
    margin-bottom: 10px;
  }
}

</style>
