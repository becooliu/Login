import Vue from 'vue'
import Vuex from 'vuex'
//import VueResource from 'vue-resource'

Vue.use(Vuex)
//Vue.use(VueResource)

const key = 'user';
const store = new Vuex.Store({
    state: {
        domain: 'http://test.example.com',
        isLogin: false, //是否登录的状态
        username: null,
        token: '',
        userInfo: {
            nick: null,
            ulevel: null,
            uid: null,
            faceImage: null
        }
    },
    getters: {
        getStorage(state){
            if(!state.username) {
                state.username = JSON.parse(localStorage.getItem(key))
            }
            return state.username
        },
        getLoginStatus(){
            return state.isLogin;
        }
    },
    mutations: {
        $_setStorage(state,value){
            state.username = value;
            localStorage.setItem(key,JSON.stringify(value))
        },
        $_removeStorage(state) {
            state.username = null;
            localStorage.removeItem(key)
        },
        updateUserInfo(state,newUserInfo) {
            state.userInfo = newUserInfo;
        },
        $_setTokenStorage(state,value) {
            state.token = value;
            localStorage.setItem('token',value);
        }
    },
    actions: {
        getUserInfo(context){
            context.commit('GETUSERINFO')
        }
    }
})

export default store