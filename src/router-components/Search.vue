<template>
  <div id="search-result">
    <search-bar :isStatic="true" :options="{ category: $route.query.category }"/>

    <div class="margin-space"></div>

    <div id="categories" v-if="!category && categories">
      <b class="title" v-if="categories.length">分类</b>
      <landing-content :categories="categories"/>
      <span v-if="!categories.length" id="empty">暂无分类</span>
    </div>

    <div id="albums" v-if="albums">
      <b class="title">相册</b>
      <albums-list :albums="albums"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBar from '@/components/SearchBar'
import LandingContent from '@/components/LandingContent'
import AlbumsList from '@/components/AlbumsList'

export default {
  name: 'Search',
  components: {
    SearchBar,
    LandingContent,
    AlbumsList
  },
  computed: {
    ...mapGetters([
      'allCategories',
      'allAlbums'
    ]),
    category () {
      return this.$route.query ? this.$route.query.category : ''
    },
    categories () {
      const query = new RegExp(this.$route.query.keyword)
      return this.allCategories.filter(c => query.test(c.name) || query.test(c.title))
    },
    albums () {
      const query = new RegExp(this.$route.query.keyword)
      return this.allAlbums.filter(a => (this.category ? a.category === this.category : true) && query.test(a.title))
    }
  }
}
</script>

<style lang="css" scoped>
.margin-space {
  display: block;
  width: 100%;
  height: 165px;
  background: #333;
}
b.title {
  margin: 5px 10px;
  display: block;
}
#empty {
  width: 100%;
  display: block;
  color: #999;
  text-align: center;
  font-family: "Lantinghei SC", "Lantinghei TC", Arial, serif;
  clear: both;
}
</style>
