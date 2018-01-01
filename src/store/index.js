/**
 * Created by Administrator on 2017/12/27.
 */

import Vue from 'vue'
import vuex from 'vuex'
import getters from './getters'

Vue.use(vuex);


const state = {
  baseUrl:'http://localhost:3000'
};

export default new vuex.Store({
  state,
  getters
});
