import Vue from 'vue'
import Vuex from 'vuex'
//import VueResource from 'vue-resource'

Vue.use(Vuex)
//Vue.use(VueResource)

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
        },
        GETUSERINFO(state){
            /* this.$http.get('/static/data/userInfo.json').then(function(res){
                console.log(res.data.nick);
            }) */
        }
    },
    actions: {
        getUserInfo(context){
            context.commit('GETUSERINFO')
        }
    }
})

export default store