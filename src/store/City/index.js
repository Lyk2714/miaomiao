const state = {
    nm : window.localStorage.getItem('nowNm') || '北京',
    id : window.localStorage.getItem('nowId')
}
const mutations = {
    //修改状态的函数 大写字母
    CITY_INFO(state,payload){
        state.nm = payload.nm;
        state.id = payload.id ? payload.id : 1;
    }
}
const actions = {

}

export default {
    namespaced : true,
    state,
    mutations,
    actions
}