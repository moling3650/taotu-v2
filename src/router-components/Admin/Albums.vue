<template>
  <div class="categories">
    <div class="page-header">
      <h1>{{'album' | i18n}}</h1>
    </div>

    <div class="row">
      <ul class="nav nav-pills col-sm-7">
        <li role="presentation" @click="search(null)"><a>{{'all' | i18n}}</a></li>
        <li role="presentation" v-for="category in allCategories" :key="category.name" @click="search(`categoryName:${category.name}`)"><a>{{category.title}}</a></li>
      </ul>

      <form class="form-inline pull-right">
        <div class="form-group">
          <router-link tag="button" class="btn btn-primary" to="/albums/new"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            {{'new' | i18n}}
          </router-link>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="keyword">
          <button class="btn" @click.prevent="search(keyword)"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            {{'search' | i18n}}
          </button>
        </div>
      </form>
    </div>

    <div class="row">
      <router-link
        class="album img-rounded"
        v-for="album in albums" :key="album.title"
        :to="{ path: `/albums/${album.title}` }"
      >
        <h3 class="album-title">{{album.title}} <span class="category">{{album.category}}</span></h3>
        <img :src="album.photos[0]" :alt="album.title">
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Albums',
  data () {
    return {
      query: '',
      keyword: ''
    }
  },
  computed: {
    ...mapGetters([
      'allAlbums',
      'allCategories'
    ]),
    albums () {
      if (!this.query) {
        return this.allAlbums
      } else if (this.query.startsWith('categoryName:')) {
        const categoryName = this.query.split(':', 2).pop()
        return this.allAlbums.filter(a => a.category === categoryName)
      } else {
        const query = new RegExp(this.query)
        return this.allAlbums.filter(a => query.test(a.title))
      }
    }
  },
  methods: {
    search (keyword) {
      this.query = keyword
    }
  },
  activated () {
    this.query = ''
  }
}
</script>

<style lang="css" scoped>
.album {
  width: 287.5px;
  height: 287.5px;
  overflow: hidden;
  display: inline-block;
  margin: 2.5px;
  position: relative;
  cursor: pointer;
}
.album-title {
  position: absolute;
  color: #FFF;
  bottom: 0;
  margin-left: 20px;
  text-shadow: 0 0 2px #666;
  font-size: 24px;
  line-height: 24px;
}
.album-title .category {
  font-size: 12px;
  line-height: 24px;
}
.album img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
