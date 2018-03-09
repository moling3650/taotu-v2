<template>
  <div class="album">
    <div class="page-header">
      <h1 v-if="!isNew">{{album.title}}</h1>
      <h1 v-else>{{'new' | i18n}} {{'album' | i18n}}</h1>
    </div>

    <form>
      <div class="form-group">
        <label for="title">{{'title' | i18n}}</label>
        <input type="text" class="form-control" v-model="album.title" :disabled="!isNew">
      </div>

      <div class="form-group">
        <label for="category">{{'category' | i18n}}</label>
        <select class="form-control" v-model="album.category">
          <option
            v-for="category in allCategories"
            :value="category.name"
            :key="category.name"
          >{{category.title}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="content">{{'text content' | i18n}}</label>
        <textarea class="form-control" id="content" rows="7" v-model="album.content"></textarea>
      </div>

      <div class="photos" :class="{ over: over }" ref="photos">
        <div class="photo img-rounded" v-for="(photo, index) in album.photos" :key="index">
          <span @click="removePhoto(index)" class="remove-btn glyphicon glyphicon-remove" aria-hidden="true"></span>
          <img :src="photo">
        </div>
        <div class="photo" >
          <span class="add-btn glyphicon glyphicon-plus" aria-hidden="true" ref="add"></span>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary" @click.prevent="submit"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> {{'finish' | i18n}}</button>
        <button class="btn btn-danger" @click.prevent="deleteAlbum" v-if="!isNew"><span class="glyphicon glyphicon-remove"></span> {{'delete' | i18n}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import qiniu from 'qiniu.js'
import { mapGetters } from 'vuex'
import i18n from '@/utils/i18n'
import bucket from '@/models/bucket'
import { successMessage, errorMessage } from '@/utils/messages'

const URL = window.URL || window.webkitURL

export default {
  name: 'Album',
  data () {
    return {
      over: false,
      photosToUpload: new Map(),
      isNew: false,
      album: {
        photos: []
      }
    }
  },
  computed: mapGetters({
    password: 'keys',
    allCategories: 'allCategories',
    allAlbums: 'allAlbums'
  }),
  methods: {
    submit () {
      const files = [...this.photosToUpload.values()]
      bucket.fetchPutToken(this.password)
        .then(putToken => this.uploadFiles(putToken, files))
        .then(urls => [...this.album.photos.filter(url => !url.startsWith('blob:')), ...urls])
        .then(photos => this.$set(this.album, 'photos', photos))
        .then(() => this.$store.dispatch('updateAlbum', this.album))
        .then(() => successMessage('update succeed', 1500))
        .then(() => this.$router.push({ name: 'Albums' }))
        .catch(err => errorMessage(err.message || 'update failed', 1500))
    },
    uploadFiles (putToken, files) {
      return Promise.all(
        files.map(file => {
          const filename = `assets/photos/${Math.random().toString(32).substr(2)}`
          return bucket.putFile(filename, file, {putToken}).then(() => bucket.key(filename).url())
        })
      )
    },
    deleteAlbum () {
      swal({
        title: i18n('are you sure'),
        type: 'warning',
        showCancelButton: true
      })
        .then(({value: sure}) => sure ? Promise.resolve() : Promise.reject(new Error('cancel delete')))
        .then(() => this.$store.dispatch('deleteAlbum', this.$route.params.key))
        .then(() => successMessage('delete succeed', 1500))
        .then(() => this.$router.push({ name: 'Albums' }))
        .catch(err => errorMessage(err.message || 'delete failed', 1500))
    },
    addPhoto (file) {
      this.over = false
      file.imageView({
        mode: 1,
        width: 125,
        height: 125
      }, (error, image) => {
        if (!error) {
          image.toBlob(blob => {
            const blobUrl = URL.createObjectURL(blob)
            this.album.photos.push(blobUrl)
            this.photosToUpload.set(blobUrl, file)
          })
        }
      })
    },
    removePhoto (index) {
      this.photosToUpload.delete(this.album.photos[index])
      this.album.photos.splice(index, 1)
    }
  },
  mounted () {
    qiniu.bind(this.$refs.add).on('file', this.addPhoto)
    if (qiniu.supportDnd) {
      qiniu.bind.dnd(this.$refs.photos, {})
        .on('over', () => (this.over = true))
        .on('out', () => (this.over = false))
    }
  },
  activated () {
    this.isNew = this.$route.params.key === 'new'
    this.album = JSON.parse(JSON.stringify(this.allAlbums.find(a => a.title === this.$route.params.key) || {photos: []}))
    this.photosToUpload.clear()
  }
}
</script>

<style lang="css" scoped>
.photos {
  width: 100%;
  min-height: 400px;
  border: 5px dashed #CCC;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
}
.photos.over {
  border-color: #888;
}
.photo {
  width: 125px;
  height: 125px;
  margin: 2.5px;
  float: left;
  position: relative;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.photo .remove-btn {
  display: none;
  position: absolute;
  font-size: 10px;
  width: 16px;
  height: 16px;
  padding-left: 1px;
  line-height: 16px;
  text-align: center;
  background: #d9534f;
  color: #FFF;
  border-radius: 7px;
  top: -7px;
  right: -7px;
  cursor: pointer;
  z-index: 999;
}
.photo:hover .remove-btn {
  display: block;
}
.photo .add-btn {
  font-size: 25px;
  border: 2px dashed #999;
  cursor: pointer;
  color: #999;
  width: 125px;
  height: 125px;
  line-height: 125px;
  text-align: center;
}
</style>
