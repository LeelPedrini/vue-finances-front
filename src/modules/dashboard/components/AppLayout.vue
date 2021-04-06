<template>
  <div>
    <AppBar v-model="drawer" />
    <AppMenu v-model="drawer" />

    <v-container grid-list-md>
      <v-layout>
        <v-flex xs12>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>

    <AppFloatingButton />
  </div>
</template>

<script>

import AppMenu from './AppMenu.vue'
import AppFloatingButton from './AppFloatingButton.vue'
import AppBar from './AppBar.vue'
export default {
  name: 'AppLayout',
  components: {
    AppFloatingButton,
    AppBar,
    AppMenu
  },
  data: () => ({
    drawer: false
  })
}
</script>
