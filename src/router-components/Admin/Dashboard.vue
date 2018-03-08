<template>
  <div class="dashboard">
    <div class="page-header">
      <h1>{{'dashboard' | i18n}}</h1>
    </div>

    <div class="row">
      <div class="col-md-4 dashboard-number">
        <h1>{{allCategoriesCount}}</h1>
        <p>{{'number of categories' | i18n}}</p>
      </div>
      <div class="col-md-4 dashboard-number">
        <h1>{{allAlbumsCount}}</h1>
        <p>{{'number of albums' | i18n}}</p>
      </div>
      <div class="col-md-4 dashboard-number">
        <h1>{{allPhotosCount}}</h1>
        <p>{{'number of photos' | i18n}}</p>
      </div>
    </div>

    <h3>{{'rates of categories' | i18n}}</h3>

    <div class="progress">
      <div v-for="category in categoriesInfo" :key="category.title"
          :class="pickBarClass()" :style="{ width: category.rate * 100 + '%' }"></div>
    </div>
    <div class="progress-labels">
      <div v-for="category in categoriesInfo" :key="category.title" v-if="category.rate > 0" class="progress-label"
          :style="{ width: category.rate * 100 + '%' }">{{category.title}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: mapGetters([
    'categoriesInfo',
    'allCategoriesCount',
    'allAlbumsCount',
    'allPhotosCount'
  ]),
  methods: {
    pickBarClass: (function () {
      const colors = ['success', 'primary', 'info', 'warning', 'danger']
      let last = null
      return function pickBarClass () {
        while (true) {
          const color = `progress-bar-${colors[Math.round(Math.random() * (colors.length - 1))]}`
          if (color !== last) {
            last = color
            return `progress-bar ${color}`
          }
        }
      }
    })()
  }
}
</script>

<style lang="css" scoped>
.dashboard-number {
  text-align: center;
  padding: 5px 0;
  border-right: 1px solid #CCC;
}
.dashboard-number:last-child {
  border-right: none;
}
.dashboard-number h1 {
  font-size: 5rem;
}
.dashboard-number p {
  font-size: 1.7rem;
}
.progress-labels {
  margin-top: -15px;
}
.progress-label {
  display: inline-block;
  float: left;
  font-size: 1.8rem;
  line-height: 1.9rem;
  text-align: center;
}
</style>
