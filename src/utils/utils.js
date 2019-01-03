import {getRequest} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store)=> {
  if (store.state.userInfo.routes.length > 0) {
    return;
  }
  getRequest("/config/sysmenu").then(resp=> {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        if (component.startsWith("Home")) {
          require(['../pages/' + component + '.vue'], resolve)
        } else if (component.startsWith("Th")) {
          require(['../pages/thesis/' + component + '.vue'], resolve)
        } else if (component.startsWith("No")) {
          require(['../pages/general/' + component + '.vue'], resolve)
        } else if (component.startsWith("Ac")) {
          require(['../pages/account/' + component + '.vue'], resolve)
        } else if (component.startsWith("St")) {
          require(['../pages/statistics/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sys")) {
          require(['../pages/system/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
