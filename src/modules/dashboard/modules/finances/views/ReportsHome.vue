<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <ToolbarByMonth
        format="MM-YYYY"
        :color="color"
        :month="month || $route.query.month"
        @month="changeMonth"
      />
    </v-flex>

    <v-flex
      v-for="chart in charts"
      :key="chart.title"
      xs12
      sm6
      md6
      lg6
      xl6
    >
      <v-card>
        <v-card-text>
          <h2 class="font-weight-light mb-4">{{chart.title}}</h2>
          <canvas :ref='chart.refId'></canvas>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

import Chart from 'chart.js'
import { mergeMap } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { mapActions, mapState } from 'vuex'

import { generateChartConfigs } from './../../../../../utils'
import RecordsService from './../services/records-service.js'
import ToolbarByMonth from './../components/ToolbarByMonth.vue'

export default {
  name: 'ReportsHome',
  data: () => ({
    chartIncomesExpenses: undefined,
    chartCategoryExpenses: undefined,
    charts: [
      { title: 'Receitas vs Despesas', refId: 'chartIncomesExpenses' },
      { title: 'Despesas por Categoria', refId: 'chartCategoryExpenses' }
    ],
    monthSubject$: new Subject(),
    records: [],
    subscriptions: []
  }),
  components: {
    ToolbarByMonth
  },
  computed: {
    ...mapState('finances', ['month']),
    recordsSum () {
      return this.records.reduce((acc, record) => acc + record.amount, 0)
    },
    color () {
      return this.recordsSum < 0
        ? 'red'
        : 'green'
    }
  },
  created () {
    this.setTitle({ title: 'Relatórios' })
    this.setRecords()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  },
  methods: {
    ...mapActions(['setTitle']),
    ...mapActions('finances', ['setMonth']),
    changeMonth (month) {
      this.$router.push({
        path: this.$router.path,
        query: { month }
      }).catch(() => { })
        .finally(
          this.setMonth({ month }),
          this.monthSubject$.next(month)

        )
    },
    updateOrCreateChart (chartId, options) {
      if (this[chartId]) {
        this[chartId].data.datasets = options.data.datasets
        if (options.data.labels) {
          this[chartId].data.labels = options.data.labels
        }
        this[chartId].update()
        return this[chartId]
      }
      const ref = Array.isArray(this.$refs[chartId])
        ? this.$refs[chartId][0]
        : this.$refs[chartId]
      const ctx = ref.getContext('2d')
      this[chartId] = new Chart(ctx, options)
      return this[chartId]
    },
    setCharts () {
      this.updateOrCreateChart('chartIncomesExpenses', generateChartConfigs({
        type: 'bar',
        items: this.records,
        keyToGroup: 'type',
        keyOfValue: 'amount',
        aliases: { CREDIT: 'Receitas', DEBIT: 'Despesas' },
        backgroundColors: [
          '#F44336',
          '#4CAF50'
        ]
      }))

      this.updateOrCreateChart('chartCategoryExpenses', generateChartConfigs({
        type: 'doughnut',
        items: this.records.filter(r => r.type === 'DEBIT'),
        keyToGroup: 'category.description',
        keyOfValue: 'amount',
        backgroundColors: [
          '#8D77C9',
          '#3FC29C',
          '#D1D11F',
          '#E68D1E'
        ]
      }))
    },
    setRecords () {
      this.subscriptions.push(
        this.monthSubject$
          .pipe(
            mergeMap(month => RecordsService.records({ month }))
          ).subscribe(records => {
            this.records = records
            this.setCharts()
          })
      )
    }
  }
}
</script>
