<template>
  <div class="sidebar">
    <h2>{{'Admin' | i18n}}</h2>

    <ul class="nav nav-pills nav-stacked">
      <li role="presentation" :class="{ active: active === 'Dashboard' }">
        <router-link to="/dashboard">{{'dashboard' | i18n}}</router-link>
      </li>
      <li role="presentation" :class="{ active: active === 'Settings' }">
        <router-link to="/settings">{{'setting' | i18n}}</router-link>
      </li>
      <li role="presentation" :class="{ active: active === 'Categories' }">
        <router-link to="/categories">
          {{'category' | i18n}}
          <span class="badge">{{allCategoriesCount}}</span>
        </router-link>
      </li>
      <li role="presentation" :class="{ active: active === 'Albums' }">
        <router-link to="/albums">
          {{'album' | i18n}}
          <span class="badge">{{allAlbumsCount}}</span>
        </router-link>
      </li>
      <hr/>
      <li role="presentation"><a target="_blank" href="/">{{'go to home page' | i18n}}</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
      active: ''
    }
  },
  computed: mapGetters([
    'allCategoriesCount',
    'allAlbumsCount'
  ]),
  watch: {
    '$route' (route) {
      this.active = route.name
    }
  },
  mounted () {
    this.$router.push({ name: 'Dashboard' })
  }
}
</script>

<style lang="css" scoped>
</style>
