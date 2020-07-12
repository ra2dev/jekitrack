import React, { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import { Table, Button, Row, Typography } from 'antd'
import AppLayout from '../../components/app/AppLayout'
import axios from '../../api/axios'
import TimeControl from './TimeControl/TimeControl'
import CommonForm from '../../components/kit/forms/CommonForm'
//
const defaultColumns = [
  {
    title: 'Controls',
    key: 'date',
    width: '120px',
    render: (v: any) => {
      return <div>{v}</div>
    },
  },
  {
    title: 'Total Time',
    key: 'controls',
    render: (v: any) => {
      return <Field name={`items.${v}`} component={TimeControl} />
    },
  },
]

export default function DashboardPage() {
  // eslint-disable-next-line no-unused-vars
  const [rData, setData] = useState(null)

  useEffect(() => {
    axios.get('/reports/gitlab').then(({ data }) => {
      setData(data)
    })
  }, [])

  return (
    <AppLayout>
      <Typography.Title level={3}>Reportings</Typography.Title>
      <CommonForm
        onSubmit={(f: any) => alert(JSON.stringify(f, null, 4))}
        initialValues={{
          items: rData,
        }}
      >
        {() => {
          return (
            <>
              <Table
                dataSource={Object.keys(rData || {}) as any}
                columns={defaultColumns}
                pagination={false}
                loading={!rData}
                bordered
              />
              <br />
              <Row justify="end">
                <Button type="primary" size="large" htmlType="submit">
                  Save Reportings
                </Button>
              </Row>
            </>
          )
        }}
      </CommonForm>
      <br />
    </AppLayout>
  )
}
// <>
//     {Object.keys(rData || {}).map((k) => (
//         <Field name={`items.${k}`} component={TimeControl} />
//     ))}
//     <button>Submit</button>
// </>
