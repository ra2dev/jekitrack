import React from 'react'
import { Typography } from 'antd'
import { Fields } from '../../../components/kit'
import IntegrationForm from './common/IntegrationForm'
import { updateGitlabIntegration, fetchGitlabIntegration } from '../../../api'

const dataSource = [
  {
    key: '1',
    name: 'Url',
    description: 'Organisation Gitlab web site url',
    field: <Fields.Input name="url" placeholder="url" />,
  },
  {
    key: '2',
    name: 'Access token',
    description: (
      <>
        Check guide how you can create access token&nbsp;
        <a
          rel="noreferrer"
          target="_blank"
          href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token"
        >
          how to encrypt
        </a>
      </>
    ),
    field: <Fields.Input name="token" placeholder="token" />,
  },
]

// TODO make token hidden
export default function GitlabBlock() {
  return (
    <div>
      <Typography.Title level={3}>Gitlab Integration</Typography.Title>
      <IntegrationForm
        onSubmit={updateGitlabIntegration}
        dataSource={dataSource}
        fetchData={fetchGitlabIntegration}
        fields={['token', 'url']}
      />
    </div>
  )
}
