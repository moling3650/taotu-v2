<template>
  <div class="landing">
    <search-bar/>
    <landing-view :config="config"/>
    <landing-content :categories="allCategories"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LandingView from '@/components/LandingView'
import LandingContent from '@/components/LandingContent'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'Landing',
  components: {
    SearchBar,
    LandingView,
    LandingContent
  },
  computed: mapGetters([
    'config',
    'allCategories'
  ])
}
</script>

<style lang="css" scoped>
</style>
