/**
 * Created by xieyuanbin on 2017/8/8.
 * Email:yuanbin.xie@tempus.cn
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'  //将vuex的状态保存在localStorage中 其中可以有独立的配置

// import createLogger from 'vuex/dist/logger' //vuex中自带的log方法

//log的配置项
/*
 const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  logger: console, // 自定义 console 实现，默认为 `console`
})
 */

Vue.use(Vuex);


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [
        createPersistedState(),
        // createLogger()
    ]
});