import * as React from 'react'
import { Field } from 'react-final-form'

export const withField = (Component: any) => (props: any) => {
  const ResultComponent = ({ input, ...rest }: any) => <Component {...input} {...rest} />
  return <Field component={ResultComponent} {...props} />
}
