<template>
  <div class="category">
    <div class="page-header">
      <h1 v-if="category.title">{{category.title}}</h1>
      <h1 v-else>{{'new' | i18n}} {{'category' | i18n}}</h1>
    </div>

    <form>
      <div class="form-group">
        <label for="title">{{'title' | i18n}}</label>
        <input type="text" class="form-control" v-model="category.title">
      </div>

      <div class="form-group">
        <label for="name">{{'name' | i18n}}</label>
        <input type="text" class="form-control" v-model="category.name" :disabled="!isNew">
      </div>

      <div class="form-group">
        <label for="subtitle">{{'subtitle' | i18n}}</label>
        <input type="text" class="form-control" v-model="category.subtitle">
      </div>

      <div class="form-group">
        <label for="cover">{{'cover' | i18n}}</label>
        <div class="category-cover img-rounded">
          <img :src="category.cover" v-if="category.cover">
          <img src="https://placeholdit.imgix.net/~text?txtsize=47&txt=NO%20COVER&w=500&h=213" v-else>
        </div>

        <input type="file" ref="cover" >
      </div>

      <div class="form-group">
        <button class="btn btn-primary" @click.prevent="submit" >
          <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> {{'finish' | i18n}}
        </button>
        <button class="btn btn-danger" @click.prevent="deleteCategory" v-if="!isNew"><span
          class="glyphicon glyphicon-remove"></span> {{'delete' | i18n}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import i18n from '@/utils/i18n'
import bucket from '@/models/bucket'
import { successMessage, errorMessage } from '@/utils/messages'

export default {
  name: 'Category',
  data () {
    return {
      isNew: false,
      category: {}
    }
  },
  computed: mapGetters({
    password: 'keys',
    categories: 'allCategories'
  }),
  methods: {
    _getCoverURL () {
      if (this.$refs.cover.files.length === 0) {
        return Promise.resolve(this.category.cover)
      }
      const file = this.$refs.cover.files.item(0)
      if (!file || !file.type.startsWith('image')) {
        return Promise.reject(new Error('please select an image'))
      }
      const filename = `assets/category-${this.category.name}-${Math.random().toString(32).substr(2)}`
      return bucket.uploadFile(this.password, filename, file)
    },
    submit () {
      if (!this.category.name || !this.category.name.trim()) {
        return errorMessage('分类名不能为空', 1500)
      }
      if (this.category.name === 'new') {
        return errorMessage('分类名不能为new', 1500)
      }
      this._getCoverURL()
        .then(cover => this.$set(this.category, 'cover', cover))
        .then(() => this.$store.dispatch('updateCategory', this.category))
        .then(() => successMessage('update succeed', 1500))
        .then(() => this.$router.push({ name: 'Categories' }))
        .catch(err => errorMessage(err.message || 'update failed', 1500))
    },
    deleteCategory () {
      swal({
        title: i18n('are you sure'),
        type: 'warning',
        showCancelButton: true
      })
        .then(({value: sure}) => sure ? Promise.resolve() : Promise.reject(new Error('cancel delete')))
        .then(() => this.$store.dispatch('deleteCategory', this.$route.params.name))
        .then(() => successMessage('delete succeed', 1500))
        .then(() => this.$router.push({ name: 'Categories' }))
        .catch(err => errorMessage(err.message || 'delete failed', 1500))
    }
  },
  activated () {
    this.isNew = this.$route.params.name === 'new'
    this.category = JSON.parse(JSON.stringify(this.categories.find(c => c.name === this.$route.params.name) || {}))
  }
}
</script>

<style lang="css" scoped>
.category-cover {
  width: 500px;
  height: 213px;
  margin: 5px;
  overflow: hidden;
  position: relative;
}
.category-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
