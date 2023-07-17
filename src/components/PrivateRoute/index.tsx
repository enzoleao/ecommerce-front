import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { AppRoutes } from '@/constants/app-routes'
import { useAllContexts } from '@/contexts/useContexts'

type PrivateRouteProps = {
  children: ReactNode
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter()
  const { isAuthenticated } = useAllContexts()

  useEffect(() => {
    if (!isAuthenticated) {
      push(AppRoutes.public.login)
    }
  }, [isAuthenticated, push])
  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  )
}
export default PrivateRoute
