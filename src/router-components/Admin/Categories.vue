<template>
  <div class="categories">
    <div class="page-header">
      <h1>{{'category' | i18n}}</h1>
    </div>

    <div class="row">
      <form class="form-inline pull-right">
        <div class="form-group">
          <router-link tag="button" class="btn btn-primary" to="/categories/new"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            {{'new' | i18n}}
          </router-link>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="query">
          <button class="btn" @click.prevent="search"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            {{'search' | i18n}}
          </button>
        </div>
      </form>
    </div>

    <div class="row">
      <router-link class="category img-rounded" v-for="category in categories" :key="category.name" :to="{ path: `/categories/${category.name}` }">
        <h1 class="category-title">{{category.title}} ({{category.albumsCount}})</h1>
        <img :data-src="category.cover" :alt="category.title" class="lazyload">
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'lazysizes/lazysizes.min'

export default {
  name: 'Categories',
  data () {
    return {
      query: '',
      categories: []
    }
  },
  computed: mapGetters([
    'allCategories'
  ]),
  methods: {
    search () {
      if (!this.query) {
        const query = new RegExp(this.query)
        this.categories = this.allCategories.filter(c => query.test(c.name) || query.test(c.title))
      } else {
        this.categories = [...this.allCategories]
      }
    }
  },
  activated () {
    this.categories = [...this.allCategories]
  }
}
</script>

<style lang="css" scoped>
.category {
  width: 49%;
  margin: 10px 0.5%;
  height: 200px;
  overflow: hidden;
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.category-title {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 200px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px #666;
  margin: 0;
}
.category img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
