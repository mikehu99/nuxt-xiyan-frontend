<template>
  <div class="columns">
    <div class="column">
      <article class="media" v-for="i in media" :key="i">
        <div class="media-content">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-skeleton width="64px" height="64px"></b-skeleton>
            </p>
          </figure>
          <div class="content">
            <p>
              <b-skeleton active></b-skeleton>
              <b-skeleton height="80px"></b-skeleton>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
              </a>
              <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
              </a>
            </div>
          </nav>
        </div>
      </article>    </div>
    <div class="column">
      <article class="media" v-for="i in media" :key="i">
        <div class="media-content">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-skeleton width="64px" height="64px"></b-skeleton>
            </p>
          </figure>
          <div class="content">
            <p>
              <b-skeleton active></b-skeleton>
              <b-skeleton height="80px"></b-skeleton>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
              </a>
              <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
              </a>
            </div>
          </nav>
        </div>
      </article>    </div>
    <div class="column">
      <article class="media" v-for="i in media" :key="i">
        <div class="media-content">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-skeleton width="64px" height="64px"></b-skeleton>
            </p>
          </figure>
          <div class="content">
            <p>
              <b-skeleton active></b-skeleton>
              <b-skeleton height="80px"></b-skeleton>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
              </a>
              <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
              </a>
            </div>
          </nav>
        </div>
      </article>    </div>
  </div>
</template>
<script>
  export default {

    data() {
      return {
        media: 3
      }
    },
  }
</script>
