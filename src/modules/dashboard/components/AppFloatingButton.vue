<template>
  <v-speed-dial
    v-model="fab"
    fixed
    bottom
    left
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="blue"
        fab
      >
        <v-icon v-if="fab">close</v-icon>
        <v-icon v-else>add</v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      small
      color="red"
      title="Nova Despesa"
      @click="addRecord('debit')"
    >
      <v-icon>remove</v-icon>
    </v-btn>
    <v-btn
      fab
      small
      color="green"
      title="Nova Receita"
      @click="addRecord('credit')"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'AppFloatingButton',
  data: () => ({
    fab: false
  }),
  methods: {
    addRecord (type) {
      this.$router.push({
        name: 'records/add',
        query: { type }
      }).catch(error => {
        if (error.name !== 'NavigationDuplicated') {
          throw error
        }
      })
    }
  }
}
</script>
