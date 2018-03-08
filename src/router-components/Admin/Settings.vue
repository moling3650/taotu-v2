<template>
  <div class="settings">
    <div class="page-header">
      <h1>{{'setting' | i18n}}</h1>
    </div>

    <div class="row">
      <form>
        <div class="form-group">
          <label for="title">{{'title' | i18n}}</label>
          <input type="text" class="form-control" id="title" placeholder="Title" v-model="config.title"/>
        </div>

        <div class="form-group">
          <label for="description">{{'subtitle' | i18n}}</label>
          <textarea type="text" class="form-control" id="description" rows="7" v-model="config.description"/>
        </div>

        <label for="background">{{'background image' | i18n}}</label>
        <div class="form-group" style="overflow: hidden">
          <label class="col-sm-2 control-label"><input type="radio" value="url" name="backgroundType" v-model="backgroundType">
            URL</label>
          <div class="col-sm-10">
            <input type="url" class="form-control" v-model="config.background">
          </div>

          <label class="col-sm-2 control-label"><input type="radio" value="file" name="backgroundType" v-model="backgroundType">
            {{'upload file' | i18n}}</label>

          <div class="col-sm-10">
            <input type="file" ref="backgroundfile">
          </div>
        </div>

        <button type="button" class="btn btn-primary" @click="submit" data-toggle="button"
                :data-loading-text="'working' | i18n">{{'finish' | i18n}}
        </button>
        <button type="button" class="btn btn-default" @click="reset">{{'reset' | i18n}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bucket from '@/models/bucket'
import { successMessage, errorMessage } from '@/utils/messages'

export default {
  name: 'Settings',
  data () {
    return {
      backgroundType: 'url',
      config: {
        title: '',
        description: '',
        background: ''
      }
    }
  },
  computed: mapGetters({
    password: 'keys',
    defaultConfig: 'config'
  }),
  methods: {
    reset () {
      this.backgroundType = 'url'
      this.config = Object.assign({}, this.defaultConfig)
    },
    _getBackgroundURL () {
      if (this.backgroundType === 'url') {
        return Promise.resolve(this.config.background)
      }
      const file = this.$refs.backgroundfile.files[0]
      if (!file || !file.type.startsWith('image')) {
        return Promise.reject(new Error('please select an image'))
      }
      const filename = `assets/bg-${Math.random().toString(32).substr(2)}`
      return bucket.uploadFile(this.password, filename, file)
    },
    submit () {
      this._getBackgroundURL()
        .then(backgroundURL => this.$set(this.config, 'background', backgroundURL))
        .then(() => this.$store.dispatch('updateConfig', this.config))
        .then(() => this.reset())
        .then(() => successMessage('update succeed', 2000))
        .catch(err => errorMessage(err.message || 'something went wrong', 2000))
    }
  },
  mounted () {
    this.reset()
  }
}
</script>
