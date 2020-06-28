export const extractFieldError = (meta: any, submitting = false) => {
  if (!meta || submitting) {
    return ''
  }

  const { data, error, submitError, touched, dirty, dirtySinceLastSubmit, pristine, active, submitFailed } = meta

  const showSubmitError = !dirtySinceLastSubmit
  const showDataError = touched && !dirty
  const showSynError = submitFailed
    ? pristine || !active // after form was submitted and failed
    : !active && touched // before form was submitted

  return (showSubmitError && submitError) || (showDataError && data && data.error) || (showSynError && error) || ''
}

// We show form submit error when: fields are pristine since last submit and form is submitting
export const extractFormError = ({ dirtySinceLastSubmit, submitError, submitting }: any) => {
  return !dirtySinceLastSubmit && !submitting && submitError
}

// External submit form
// https://final-form.org/docs/react-final-form/faq
export const submitForm = (formId: string) => {
  return document.getElementById(formId)!.dispatchEvent(new Event('submit', { cancelable: true }))
}
