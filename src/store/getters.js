const getters = {
  user: state => state.userInfo.user,
  routes: state => state.userInfo.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
