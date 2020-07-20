import React, { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import parse from 'date-fns/parse'
import isEmpty from 'lodash/isEmpty'
import format from 'date-fns/format'
import { Table, Button, Row, Typography, message } from 'antd'
import AppLayout from '../../components/app/AppLayout'
import axios from '../../api/axios'
import TimeControl from './TimeControl/TimeControl'
import CommonForm from '../../components/kit/forms/CommonForm'

const defaultColumns = [
  {
    title: 'Controls',
    key: 'date',
    width: '140px',
    render: (v: any) => {
      const result = format(parse(v, 'yyyy-MM-dd', new Date()), 'ccc (dd-MMM)')
      return (
        <div>
          <b>{result}</b>
        </div>
      )
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
      const r: any = Object.entries(data).reduce(
        (acc, [k, v]: any) => ({
          ...acc,
          [k]: v?.map((e: any) => ({ ...e, time: e.time ?? 0.5 })),
        }),
        {}
      )
      setData(r)
    })
  }, [])

  return (
    <AppLayout>
      <Typography.Title level={3}>Reportings</Typography.Title>
      <CommonForm
        onSubmit={async (f: any) => {
          const result = await axios.post('/reports/track-time', f)
          if (isEmpty(result)) {
            message.success('Saved successfully.')
            return undefined
          }
          return result
        }}
        initialValues={{
          items: rData,
        }}
      >
        {({ submitting }: any) => {
          return (
            <>
              <Table
                dataSource={Object.keys(rData || {}).sort() as any}
                columns={defaultColumns}
                pagination={false}
                loading={!rData}
                bordered
              />
              <br />
              <Row justify="end">
                <Button type="primary" size="large" htmlType="submit" loading={submitting}>
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
