const getters = {
  routesAdd: state => state.authority.routesAdd,
  routes: state => state.authority.routes,
  token: state => state.user.token,
  sidebarOpened:state=>state.app.sidebarStatus
};

export default getters;