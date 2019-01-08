import  '../../lib/stomp'
import  '../../lib/sockjs'
  const user = {
    state: {
    user: {
      uername: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).uername,
      name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
      userface: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface,
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      roles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles,
      teacherName:window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).teacherName,
      academicDegree:window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).academicDegree,
      title:window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).title,
      graduatedUniversity:window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).graduatedUniversity,
    },
    routes: [],
    msgList: [],
    isDotMap: new Map(),
    currentFriend: {},
    nfDot: false
  },
  mutations: {
    initMenu(state, menus){
      state.routes = menus;
    },
    login(state, user){
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      window.localStorage.removeItem('user');
      state.routes = [];
    },
    toggleNFDot(state, newValue){
      state.nfDot = newValue;
    },
    updateMsgList(state, newMsgList){
      state.msgList = newMsgList;
    },
    updateCurrentFriend(state, newFriend){
      state.currentFriend = newFriend;
    },
    addValue2DotMap(state, key){
      state.isDotMap.set(key, "您有未读消息")
    },
    removeValueDotMap(state, key){
      state.isDotMap.delete(key);
    }
  },
  actions: {
  }
}


export default user
