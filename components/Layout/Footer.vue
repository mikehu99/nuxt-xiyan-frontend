<template>
  <footer class="footer has-text-grey-light has-background-grey-darker">
    <div class="container">
      <div class="">

      </div>

      <div>
        <span>{{ title }} ALL RIGHTS RESERVED</span>
        <div style="float: right">
          <template>
            <b-taglist attached>
              <b-tag type="is-dark" size="is-normal">Design</b-tag>
              <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
            </b-taglist>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: "Footer",
  data() {
    return {
      title: "© " + new Date().getFullYear() + ' 翻趣',
      author: '翻趣',
    };
  },
};
</script>

<style scoped>

footer {
  margin-top: 20px;
}
footer a{
  color: #bfbfbf;
}
.footer {
  padding: 3rem 1.5rem 3rem;
}
@media screen and (max-width: 768px){
  .footer {
    display: none;
  }
}


</style>
