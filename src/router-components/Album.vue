`<template>
  <div id="album">
    <router-link id="back" :to="{ path: `/category/${album.category}` }">
      <span class="icon-arrow-left"></span>
      <span class="home-text">{{'back' | i18n}}</span>
    </router-link>
    <h1 id="album-title">{{album.title}}</h1>

    <album-info :content="album.content"></album-info>
    <photos-list :photos="album.photos"></photos-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AlbumInfo from '@/components/AlbumInfo'
import PhotosList from '@/components/PhotosList'

export default {
  name: 'Album',
  components: {
    AlbumInfo,
    PhotosList
  },
  computed: {
    ...mapGetters({
      albums: 'allAlbums'
    }),
    album () {
      const albums = this.albums || []
      return albums.find(a => a.title === this.$route.params.title) || { photos: [] }
    }
  }
}
</script>

<style lang="css" scoped>
#album {
  width: 100%;
  display: block;
}
#album-title {
  margin: 0;
  display: block;
  padding: 3px 0 3px 1rem;
  border-left: 5px solid #333;
  font-family: "Lantinghei SC", "Lantinghei TC", Arial, serif;
  background: white;
}
#back {
  color: #666;
  cursor: pointer;
  padding: 1rem 0 1rem .5rem;
  line-height: 1rem;
  font-family: Arial;
  text-decoration: none;
  display: block;
  background: white;
}
#back .icon-arrow-left {
  vertical-align: middle;
}
@media only screen and (min-width: 500px) {
  #album {
    width: 85%;
    margin: 0 auto;
  }
  #back {
    width: 63.75vw;
    display: inline-block;
  }
  #album-title {
    width: 63.75vw;
    display: inline-block;
  }
}
</style>
