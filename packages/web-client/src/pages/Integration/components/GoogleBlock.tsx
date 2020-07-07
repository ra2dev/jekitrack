/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Typography, Button, Tag, Spin } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { fetchGoogleCalendarAuthUrl } from '../../../api'

export default function GoogleBlock() {
  const [authUrl, setAuthUrl] = useState(undefined)
  const [{ isExpired, integration, isLoading }, setInfo] = useState({ isLoading: true } as any)
  useEffect(() => {
    fetchGoogleCalendarAuthUrl().then((res) => {
      const { authUrl: respAuthUrl, integration } = res?.data || {}

      setInfo({
        integration: integration,
        isLoading: false,
        isExpired: integration && new Date().getTime() > integration?.expiry_date,
      })
      if (respAuthUrl) {
        setAuthUrl(respAuthUrl)
      }
    })
  }, [])
  const showConnectBtn = isExpired || !integration

  return (
    <div>
      <Typography.Title level={3}>Google Calendar Integration</Typography.Title>
      <Spin spinning={isLoading}>
        {isLoading ? (
          <Tag>Loading ...</Tag>
        ) : showConnectBtn ? (
          <>
            {integration && (
              <>
                Status: <Tag color="danger">Expired</Tag>
                <br />
                <br />
              </>
            )}
            <Button size="large" type="primary" href={authUrl}>
              <GoogleOutlined translate />

              {integration ? 'Reconnect' : 'Connect'}
            </Button>
          </>
        ) : (
          <div>
            <p>
              Status: <Tag color="green">Connected</Tag>
            </p>
            <p>
              Expiration date: <Tag>{new Date(integration?.expiry_date).toISOString()}</Tag>
            </p>
          </div>
        )}
      </Spin>
    </div>
  )
}
