import React from 'react'
import { Button, Card, Typography, Row, Divider, Form, Input } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import Logo from '../../components/kit/common/Logo'

function LoginEmail() {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Login to your account
      </Typography.Title>
      <br />
      <Form.Item name="username" colon={false} rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="Email" size="large" />
      </Form.Item>
      <Button type="primary" block size="large">
        Continue
      </Button>
      <Divider>OR</Divider>
    </>
  )
}

export default function LoginPage() {
  const onGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/google'
  }
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', minWidth: '100%', flexDirection: 'column' }}>
      <Logo />
      <Card bordered={false} style={{ minWidth: '450px' }}>
        {false && <LoginEmail />}
        <Button type="ghost" block ghost size="large" className="login-google-btn" onClick={onGoogleLogin}>
          <GoogleOutlined translate /> Continue with Google
        </Button>
        <Divider />
        <div className="content-center">
          <Typography.Text className="text-center">Can not login? Nobody cares!</Typography.Text>
        </div>
      </Card>
    </Row>
  )
}
