<template>
  <div id="search-bar" :class="{ active: active, static: isStatic }">
    <span id="search-icon" class="icon" @click="openOrSearch">&#xe600;</span>
    <input type="search" id="search-query" v-model="query.keyword" @keyup.enter="openOrSearch">
    <span id="close-icon" class="icon" @click="close" v-if="!isStatic">&#xe601;</span>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: [ 'isStatic', 'options' ],
  data () {
    return {
      active: !!this.isStatic,
      query: {
        keyword: ''
      }
    }
  },
  methods: {
    _search () {
      if (this.query.keyword) {
        this.$router.push({ name: 'Search', query: { ...this.options, ...this.query } })
      }
    },
    close () {
      this.active = false
      this.query = { keyword: '' }
    },
    openOrSearch () {
      if (!this.active) {
        this.active = true
      } else {
        this._search()
      }
    }
  }
}
</script>

<style lang="css" scoped>
#search-bar {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5vw;
  right: 0;
  margin-top: 0;
  border: 1px solid hsla(0,0%,100%,.6);
  outline: none;
  margin: 0 auto -40px;
  margin-right: 7.5vw !important;
  z-index: 5;
  border-radius: 20px;
  opacity: 0.65;
  transition: all .5s ease;
  max-width: 300px;
  overflow: hidden;
}
#search-bar.active {
  width: 55vw;
  opacity: 1;
  background: rgba(255,255,255,.25);
}
#search-bar.static {
  border-color: #333;
}
#search-icon {
  margin-left: -1px;
}
#search-query {
  background: transparent;
  border: none;
  width: calc(100% - 79px);
  height: 100%;
  display: inline;
  float: left;
  position: relative;
  outline: none;
  color: #FFF;
  font-size: 16px;
}
#search-bar.static #search-query {
  color: #333;
}
.icon {
  display: inline-block;
  font-family: iconfont;
  width: 40px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  float: left;
  color: #FFF;
  cursor: pointer;
}
#search-bar.static .icon {
  color: #333;
}
</style>
