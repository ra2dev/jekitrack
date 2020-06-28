import React from 'react'
import { Layout, Menu, Avatar, Tag, Dropdown, Button } from 'antd'
import { AppstoreOutlined, ControlOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react'
import Logo from '../kit/common/Logo'
import appState from '../../store/appState'

const { Header, Content, Sider } = Layout

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/login">Logout</Link>
    </Menu.Item>
  </Menu>
)

export default observer(function AppLayout(props: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const { appContext } = appState
  return (
    <Layout>
      <Header className="app-header">
        <div className="content-center app-logo">
          <Logo level={3} />
          &nbsp;&nbsp; <Tag color="orange">beta</Tag>
        </div>
        <div className="app-header-user">
          <Dropdown overlay={menu}>
            <Button style={{ height: '42px' }}>
              {appContext?.email}&nbsp;&nbsp;<Avatar src={appContext?.profileImageUrl}>U</Avatar>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <br />
          <Menu mode="inline" defaultSelectedKeys={[pathname]} defaultOpenKeys={[pathname]} style={{ borderRight: 0 }}>
            <Menu.Item key="/dashboard" icon={<AppstoreOutlined translate />}>
              Dashboard
              <Link to="/dashboard" />
            </Menu.Item>
            <Menu.Item key="/integrations" icon={<ControlOutlined translate />}>
              Integrations
              <Link to="/integrations" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '37px 24px 24px' }}>
          <Content className="site-layout-background">{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
})
