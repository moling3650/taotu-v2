<template>
  <div id="content">
    <div id="content-categories" v-if="categories">
      <router-link v-for="category in categories" :key="category.name" :to="{ path: `/category/${category.name}` }">
        <category :category="category"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Category'

export default {
  name: 'LandingContent',
  components: {
    Category
  },
  props: ['categories']
}
</script>

<style lang="css" scoped>
#content {
  overflow: hidden;
  display: block;
}
#content.category-page {
  overflow: hidden;
  padding: 0;
}
@media only screen and (min-width: 500px) {
  #content {
    overflow-x: scroll;
    padding-left: 1vw;
  }
  #content-categories {
    margin-right: -1000%;
  }
}
.move-to-top-leave {
  position: absolute;
  top: 0;
}
#home {
  cursor: pointer;
  position: absolute;
  z-index: 999;
  color: white;
  padding: 1rem;
  font-family: Arial;
}
#home .icon-arrow-left {
  vertical-align: middle;
}
</style>
