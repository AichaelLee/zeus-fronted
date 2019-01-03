import Vue from 'vue'
import Vuex from 'vuex'
import '../lib/sockjs'
import '../lib/stomp'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // tagsView,
  modules: {
    userInfo: user,
    tagsView:tagsView
  },
  getters
  
});
