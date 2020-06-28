import React from 'react'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import { Col, Form } from 'antd'
import cn from 'classnames'
import { extractFieldError } from '../../../helpers/form'

const colProps = ['span', 'order', 'offset', 'push', 'pull', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'noLabelHolder']

const FormBlock = ({
  submitting,
  meta,
  label,
  tooltip,
  itemProps,
  formClassName,
  component: Component,
  noLabelHolder,
  ...props
}: any) => {
  const error = extractFieldError(meta, submitting)

  return (
    <Col {...pick(props, colProps)}>
      <Form.Item
        validateStatus={error ? 'error' : undefined}
        colon={false}
        className={cn(formClassName || '', itemProps && itemProps.className)}
      >
        <Component {...omit(props, colProps)} />
      </Form.Item>
    </Col>
  )
}

FormBlock.defaultProps = {
  span: 24,
}

export default FormBlock
