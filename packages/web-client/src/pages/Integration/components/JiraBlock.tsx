import React from 'react'
import { Typography } from 'antd'
import { Fields } from '../../../components/kit'
import IntegrationForm from './common/IntegrationForm'
import { updateJiraIntegration, fetchJiraIntegration } from '../../../api'

const dataSource = [
  {
    key: '1',
    name: 'Url',
    description: 'Organisation Jira web site url',
    field: <Fields.Input name="url" placeholder="url" />,
  },
  {
    key: '2',
    name: 'Username',
    description: 'without domain @gmail.com',
    field: <Fields.Input name="username" placeholder="token" />,
  },
  {
    key: '3',
    name: 'Password',
    description: 'password will be stored ',
    field: <Fields.Input name="password" placeholder="password" />,
  },
]

export default function JiraBlock() {
  return (
    <div>
      <Typography.Title level={3}>Jira Integration</Typography.Title>
      <IntegrationForm
        onSubmit={updateJiraIntegration}
        dataSource={dataSource}
        fetchData={fetchJiraIntegration}
        fields={['url', 'username', 'password']}
      />
    </div>
  )
}
