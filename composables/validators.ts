import * as validators from '@vuelidate/validators'

export const useValidators = () => {
  const { t } = useUtility()
  const { createI18nMessage } = validators

  const messagePath = (data: { $validator: string; $propertyPath: string }) =>
  `validation-messages.${data.$propertyPath}.${data.$validator}`

  const withI18nMessage = createI18nMessage({ t, messagePath })

  const required = withI18nMessage(validators.required)
  return {
    required
  }
}
