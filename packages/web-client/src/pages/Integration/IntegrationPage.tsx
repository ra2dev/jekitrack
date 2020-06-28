/* eslint-disable react/state-in-constructor */
import React from 'react'
import { Layout, Tabs, Card, Typography } from 'antd'
import AppLayout from '../../components/app/AppLayout'
import JiraBlock from './components/JiraBlock'
import GitlabBlock from './components/GitlabBlock'
import GoogleBlock from './components/GoogleBlock'

// 770056324406-9te1fa2abgqp05gbgs6qk7mqg7t60he7.apps.googleusercontent.com
// twU0Z2J3NYJ68p6FDeOLJhXl
// API_KEY AIzaSyAjeTB8SFlNwISIloJl9_KokP9LnOuYLqs
export default function IntegrationPage() {
  return (
    <AppLayout>
      <Typography.Title level={3}>Integrations</Typography.Title>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Card className="">
          <div className="integration-block">
            <Tabs tabPosition="left">
              <Tabs.TabPane tab="Jira Attlasian" key="1">
                <JiraBlock />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Gitlab" key="2">
                <GitlabBlock />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Google Calendar" key="3">
                <GoogleBlock />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Card>
      </Layout>
    </AppLayout>
  )
}
