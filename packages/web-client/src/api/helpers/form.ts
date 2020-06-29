import { FORM_ERROR } from 'final-form'

export const withFormRequest = (fn: any) => async (...args: any[]) => {
  try {
    await fn(...args)
    return undefined
  } catch (e) {
    return { [FORM_ERROR]: e.response?.data?.message ?? e?.message ?? 'Failed to perfom action' }
  }
}
