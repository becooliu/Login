import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        domain: 'http://test.example.com',
        userInfo: {
            nick: null,
            ulevel: null,
            uid: null,
            faceImage: null
        }
    },
    mutations: {
        updateUserInfo(state,newUserInfo) {
            state.userInfo = newUserInfo;
        }
    }
})