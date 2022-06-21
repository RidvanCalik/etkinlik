import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            hostUrl: "http://localhost:3001/",
            count: 0,
            darkTheme: false
        }
    },
    mutations: {

        increment(state) {
            state.count++
        }
    }
})

export default store;