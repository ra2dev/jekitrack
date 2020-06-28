import React from 'react'
import { Form as FinalForm } from 'react-final-form'
import { extractFormError } from '../../../helpers/form'

const CommonForm = ({ children, render, onSubmit, onSuccess, className, ...rest }: any) => {
  return (
    <FinalForm {...rest} validateOnBlur={false} onSubmit={onSubmit} className={className}>
      {(props: any) => (
        <form onSubmit={props.handleSubmit}>
          {(render || children)({
            ...props,
            formError: extractFormError(props),
          })}
        </form>
      )}
    </FinalForm>
  )
}

CommonForm.defaultProps = {}

export default CommonForm
