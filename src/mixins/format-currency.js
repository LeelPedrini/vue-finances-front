import { currencyFormatter } from '@/utils.js'

export default {
  methods: {
    formatCurrency (value) {
      return currencyFormatter().format(value)
    }
  }
}
