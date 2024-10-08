import { FieldErrors, useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'

import { FormValuesNewCabin } from './interfaceCabin'
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

interface CabinToEditProps {
  cabinToEdit?: {
    id: number
    createAt: string
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image: string
  }
  handleCloseModal?: () => void
}

function CreateCabinForm({ cabinToEdit, handleCloseModal }: CabinToEditProps) {
  const { id: editId } = cabinToEdit || {}
  const isEdit = Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm<FormValuesNewCabin>({
    defaultValues: isEdit ? cabinToEdit : {}
  })
  const { errors } = formState

  const { isCreating, createCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()

  const isWorking = isCreating || isEditing

  function onSubmit(data: FormValuesNewCabin) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if (isEdit) {
      editCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset()
            handleCloseModal?.()
          }
        }
      )
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset()
            handleCloseModal?.()
          }
        }
      )
    }
  }

  function onError(errors: FieldErrors<FormValuesNewCabin>) {
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={handleCloseModal ? 'modal' : 'regular'}>
      {isEdit && <input type='hidden' {...register('id')} />}
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' }
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Regular price should be at least 1' }
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price'
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isWorking}
          type='file'
          accept='image/*'
          {...register('image', { required: isEdit ? false : 'You should be upload a picture' })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation='secondary' type='reset' disabled={isWorking} onClick={() => handleCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>{isEdit ? 'Edit cabin' : 'Creat new cabin'}</Button>
        </>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
