import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'

export function useCurrentUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })

  return { isLoading, user, isAuthenticated: user?.aud === 'authenticated' }
}
