<template>
  <div class="admin container">
    <div class="row">
      <div class="col-md-3">
        <sidebar/>
      </div>
      <div class="col-md-9 pull-right">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Admin',
  components: {
    Sidebar
  }
}
</script>

<style lang="css" scoped>
.admin {
  margin-top: 50px;
}
</style>
