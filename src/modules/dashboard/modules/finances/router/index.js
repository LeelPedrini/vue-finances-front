const RecordsHome = () => import('./../views/RecordsHome.vue')
const RecordsAdd = () => import('./../views/RecordsAdd.vue')
const ReportsHome = () => import('./../views/ReportsHome.vue')

export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ['home', '']
  },
  {
    path: 'records/add',
    component: RecordsAdd,
    name: 'records/add',
    meta: { requiresAuth: true }
  },
  {
    path: 'reports',
    component: ReportsHome,
    meta: { requiresAuth: true }
  }
]
