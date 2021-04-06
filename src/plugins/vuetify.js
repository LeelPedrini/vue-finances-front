import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import pt from 'vuetify/lib/locale/pt'
/* import 'vuetify/src/stylus/app.styl' */
/* import 'vuetify/src/styles/main.sass' */
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'md'
  },
  theme: {
    dark: true
  }
})
