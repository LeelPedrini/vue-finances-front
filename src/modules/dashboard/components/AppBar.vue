<template>
  <v-app-bar
    app
    fixed
    color='blue'
  >
    <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>
    <v-toolbar-title>{{title || 'Dashboard'}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        icon
        @click='showLogoutDialog = true'
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar-items>

    <v-dialog
      v-model='showLogoutDialog'
      max-width="300px"
    >
      <v-card>
        <v-card-title>
          <p class="sub-heading">Deseja realmente sair?</p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            small
            @click='showLogoutDialog = false'
          >
            NÃO
          </v-btn>
          <v-btn
            text
            small
            @click='logout'
          >
            SIM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import apollo, { onLogout } from '@/plugins/apollo.js'
import { mapState } from 'vuex'

export default {
  name: 'AppBar',
  props: {
    show: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  },
  data: () => ({
    showLogoutDialog: false
  }),
  computed: {
    ...mapState(['title'])
  },
  methods: {
    async logout (e) {
      this.$router.push('/login')
      await onLogout(apollo)
    }
  }
}
</script>
