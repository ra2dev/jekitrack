/* eslint-disable */
import React from 'react'
import { Typography, Button, Tag } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

export default function GoogleBlock() {
  const isConnected = true
  return (
    <div>
      <Typography.Title level={3}>Google Calendar Integration</Typography.Title>
      {!isConnected ? (
        <Button size="large" type="primary">
          <GoogleOutlined translate />
          Connect
        </Button>
      ) : (
        <div>
          Status: <Tag color="green">Connected</Tag>
        </div>
      )}
    </div>
  )
}
