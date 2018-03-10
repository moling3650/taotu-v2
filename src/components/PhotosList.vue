<template>
  <section id="album-photos">
    <img v-for="photo in photos" :key="photo" :data-src="photo | thumbnail" class="album-photo lazyload">
  </section>
</template>

<script>
import 'lazysizes/lazysizes.min'
export default {
  name: 'PhotosList',
  props: ['photos']
}
</script>

<style lang="css" scoped>
#album-photos {
  width: 100%;
  background: white;
}
.album-photo {
  width: 100%;
  margin-top: .8rem;
}
@media only screen and (min-width: 500px) {
  #album-photos {
    width: 63.75vw;
  }
}
</style>
