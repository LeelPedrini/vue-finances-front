export default {
  methods: {
    amountColor (amount) {
      return amount < 0
        ? 'red--text text--lighten-1'
        : 'green--text text--lighten-1'
    }
  }

}