import React from 'react'
import { Table, Row, Button, Typography } from 'antd'
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

export default function IntegrationForm({ dataSource, onSubmit, columns = defaultColumns }: any) {
  return (
    <CommonForm onSubmit={onSubmit}>
      {() => {
        return (
          <>
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
            <br />
            <Row justify="end">
              <Button type="ghost" size="large" style={{ marginRight: '10px' }}>
                Validate
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                Save Settings
              </Button>
            </Row>
          </>
        )
      }}
    </CommonForm>
  )
}
