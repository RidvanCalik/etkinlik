import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



library.add(faFilter);


const app = createApp(App);

app.use(router);
app.use(store);
app.component("fa", FontAwesomeIcon)
app.mount('#app');
