export enum ELoginRoutes {
  LOGIN_PAGE = '/login',
  REGISTER_PAGE = '/register',
}

export enum EProfileRoutes {
  PROFILE_PAGE = '/health/profile',
}

export enum EAboutAppRoutes {
  ABOUT_PAGE = '/health/about',
}

export const PUBLIC_ROUTES = [
  ELoginRoutes.LOGIN_PAGE,
  ELoginRoutes.REGISTER_PAGE,
];
