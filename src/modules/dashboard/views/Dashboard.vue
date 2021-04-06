<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import { registerVuexModule } from '@/utils.js'
import financesStore from './../modules/finances/store/index.js'
import AppLayout from './../components/AppLayout.vue'
export default {
  name: 'Dashboard',
  components: {
    AppLayout
  },
  created () {
    registerVuexModule(this.$store, 'finances', financesStore)
  }
}
</script>
