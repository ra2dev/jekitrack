import React from 'react'
import { Typography } from 'antd'
import { Fields } from '../../../components/kit'
import IntegrationForm from './common/IntegrationForm'

const dataSource = [
  {
    key: '1',
    name: 'Url',
    description: 'Organisation Gitlab web site url',
    field: <Fields.Input name="url" placeholder="url" />,
  },
  {
    key: '2',
    name: 'API token',
    description: 'You generate the token from your Atlassian account',
    field: <Fields.Input name="token" placeholder="token" />,
  },
]

export default function GitlabBlock() {
  return (
    <div>
      <Typography.Title level={3}>Gitlab Integration</Typography.Title>
      <IntegrationForm onSubmit={(f: any) => alert(JSON.stringify(f))} dataSource={dataSource} />
    </div>
  )
}
