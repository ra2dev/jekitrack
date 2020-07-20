/* eslint-disable camelcase */
import format from 'date-fns/format'
import { ReportGroupType } from './types'

export const extractTicketNumber = (str: string) => {
  const result = str.match(/GENESIS[-_][0-9]+/)?.[0]
  return result?.replace('_', '-')
}

export const getTicketNumber = (event: any) => {
  const items = [event?.push_data?.commit_title, event?.push_data?.ref, event?.target_title].filter(Boolean)
  const tStr = items.find(extractTicketNumber)

  if (!tStr) {
    const isPoc = items.some((e) => e?.toString()?.toUpperCase()?.includes('POC'))
    if (isPoc || process.env.NODE_ENV !== 'development') {
      return null
    }
    throw new Error(`Can not find ticket for ${JSON.stringify(event)} `)
  }
  return extractTicketNumber(tStr)
}

export const getEventDescription = (event: any) => {
  return (
    event?.push_data?.commit_title ||
    (event?.action_name?.includes('commented') && `Commented at: ${event?.target_title}`) ||
    (event?.action_name?.includes('action_name') && `Opened MR: ${event.target_title}`) ||
    'Unknown action'
  )
}

export const groupEvents = (eventList: any[]): ReportGroupType => {
  const events = eventList.filter((e) => !(e.action_name?.includes('pushed') && e?.push_data?.ref === 'master'))

  const result: any = {}
  events.forEach((e: any) => {
    const dateKey = format(new Date(e?.created_at ?? e?.note?.created_at), 'yyyy-MM-dd')
    result[dateKey] = result[dateKey] ?? []
    const ticket = getTicketNumber(e)
    if (!ticket) {
      return
    }
    let data: any = result[dateKey]?.find((l: any) => l.ticket === ticket)
    const actionName = e.action_name
    const eventDescription = getEventDescription(e)
    if (data) {
      data.actions[actionName] = [...(data.actions[actionName] || []), eventDescription]
    } else {
      data = { ticket, actions: { [actionName]: [eventDescription] } }
      result[dateKey].push(data)
    }
  })

  return result
}
