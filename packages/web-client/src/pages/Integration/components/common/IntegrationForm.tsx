import React, { useEffect, useState } from 'react'
import { Table, Row, Button, Typography, Alert, message } from 'antd'
import { pick } from 'lodash'
import CommonForm from '../../../../components/kit/forms/CommonForm'

const defaultColumns = [
  {
    title: 'General',
    key: 'name',
    render: ({ name, description }: any) => {
      return (
        <div>
          <Typography.Text className="color-white" style={{ fontWeight: 'bold' }}>
            {name}
          </Typography.Text>
          <br />
          <Typography.Text>{description}</Typography.Text>
        </div>
      )
    },
  },
  {
    title: ' ',
    key: 'age',
    render: ({ field }: any) => {
      return field ?? ''
    },
  },
]

export default function IntegrationForm({ dataSource, onSubmit, columns = defaultColumns, fetchData, fields }: any) {
  const [data, setData] = useState(false as any)
  useEffect(() => {
    fetchData().then((res: any) => {
      setData(pick(res?.data, fields))
    })
    // eslint-disable-next-line
  }, [])
  const onFormSubmit = async (form: any, ...args: any[]) => {
    try {
      const result = await onSubmit(form, ...args)
      message.success('Saved integration successfully')
      return result
    } finally {
      setData({ ...form, password: null })
    }
  }

  return (
    <CommonForm onSubmit={onFormSubmit} initialValues={data}>
      {({ submitting, formError }: any) => {
        return (
          <>
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
            <br />
            <Row justify="space-between">
              <div>{formError && <Alert message={formError} type="error" />}</div>
              <Button type="primary" size="large" htmlType="submit" loading={submitting}>
                Save Settings
              </Button>
            </Row>
          </>
        )
      }}
    </CommonForm>
  )
}
