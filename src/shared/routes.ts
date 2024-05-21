type TRoute = Record<string, string>;

type TRoutes = Record<string, TRoute>;

const routes: TRoutes = {
  starting: {
    startingPage: '/',
  },
  login: {
    loginPage: '/login',
    registerPage: '/register',
  },
  user: {
    userProfilePage: '/profile',
  },
  medCard: {
    mainPage: '/med-card',
  },
  medResults: {
    mainPage: '/med-results',
  },
};

const publicRoutes: Array<string> = [
  routes.login.loginPage,
  routes.login.registerPage,
];

export { routes, publicRoutes };
