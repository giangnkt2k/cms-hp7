import * as validators from '@vuelidate/validators'

export const useValidators = () => {
  const { $t } = useNuxtApp()
  const { createI18nMessage } = validators

  const messagePath = (data: { $validator: string; $propertyPath: string }) =>
  `validation-messages.${data.$validator}.${data.$propertyPath}`

  const withI18nMessage = createI18nMessage({ t: $t, messagePath })

  const required = withI18nMessage(validators.required)
  const sameAs = withI18nMessage(validators.sameAs, {
    withArguments: true
  })
  const alpha = withI18nMessage(validators.alpha)
  const alphaNum = withI18nMessage(validators.alphaNum)
  const numeric = withI18nMessage(validators.numeric)
  return {
    required,
    sameAs,
    alphaNum,
    alpha,
    numeric
  }
}
