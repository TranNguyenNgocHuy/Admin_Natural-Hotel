import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting as updateSettingApi } from '../../services/apiSettings'
import toast from 'react-hot-toast'

export function useUpdateSetting() {
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings successfully updated'),
        queryClient.invalidateQueries({
          queryKey: ['settings']
        })
    },
    onError: (err: Error) => {
      toast.error(err.message)
    }
  })

  return { isUpdating, updateSetting }
}
