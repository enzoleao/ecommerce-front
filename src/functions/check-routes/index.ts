import { AppRoutes } from '@/constants/app-routes'

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoutes = Object.values(AppRoutes.public)
  return appPublicRoutes.includes(asPath)
}
