import React, { useEffect, useState } from 'react'
import { Table, Row, Button, Typography } from 'antd'
import CommonForm from '../../../../components/kit/forms/CommonForm'
import { pick } from 'lodash'

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

export default function IntegrationForm({
  dataSource,
  onSubmit,
  columns = defaultColumns,
  fetchData,
  validate,
  fields,
}: any) {
  const [data, setData] = useState(false as any)
  useEffect(() => {
    fetchData().then((res: any) => {
      setData(pick(res?.data, fields))
    })
  }, [])
  return (
    <CommonForm onSubmit={onSubmit} initialValues={data}>
      {({ submitting }: any) => {
        return (
          <>
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
            <br />
            <Row justify="end">
              <Button type="ghost" size="large" style={{ marginRight: '10px' }} onClick={validate}>
                Validate
              </Button>
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
