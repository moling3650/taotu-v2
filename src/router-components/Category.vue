<template>
  <div id="category">
    <router-link class="back back-white" to="/">
      <span class="icon-arrow-left"></span>
      <span>{{ 'home' | i18n }}</span>
    </router-link>

    <search-bar :options="{ category: $route.params.name }"/>
    <category-item :category="category" :as-title="true"/>

    <albums-list :albums="albums"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryItem from '@/components/CategoryItem'
import AlbumsList from '@/components/AlbumsList'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'Category',
  components: {
    CategoryItem,
    AlbumsList,
    SearchBar
  },
  computed: {
    ...mapGetters([
      'allCategories',
      'allAlbums'
    ]),
    category () {
      const categories = this.allCategories || []
      return categories.find(c => c.name === this.$route.params.name) || {}
    },
    albums () {
      return this.allAlbums.filter(a => a.category === this.category.name)
    }
  }
}
</script>

<style lang="css" scoped>
.back {
  position: absolute;
  z-index: 999;
  color: #666;
  cursor: pointer;
  padding: .5rem 0;
  margin: .5rem .8rem 0 .8rem;
  font-family: Arial;
  text-decoration: none;
}
.back .icon-arrow-left {
  vertical-align: middle;
}
.back.back-white {
  color: white;
  text-shadow: 0 0 1px gray;
}
</style>
