import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/app/AppLayout'

export default function DashboardPage() {
  // eslint-disable-next-line no-unused-vars
  const [data] = useState(null as any)
  useEffect(() => {
    fetch('http://localhost:3001/integrations/jira')
      .then((d) => {
        console.log(d)
      })
      // .then((d) => setData(d ? JSON.stringify(d) : 'No data'))
      .catch((e) => {
        console.log(e)
      })
  }, [])
  return (
    <AppLayout>
      <div>DASHBOAR</div>
      <code>{data}</code>
    </AppLayout>
  )
}
