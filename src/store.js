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
        GETUSERINFO(state){
            //this.$http.get('/api/uploadImg/postImg')
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