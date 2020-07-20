import format from 'date-fns/format'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { ReportGroupType } from './types'

export const groupEvents = (times: any[]): ReportGroupType => {
  const result = times.reduce((acc, e) => {
    const key = format(new Date(e?.start), 'yyyy-MM-dd')
    return { ...acc, [key]: (acc[key] || 0) + differenceInMinutes(new Date(e?.end), new Date(e?.start)) }
  }, {})

  Object.keys(result).forEach((k) => {
    result[k] = [
      {
        ticket: 'ITL-3',
        time: Math.round(result[k] / 60) || 0.5,
        actions: ['meeting'],
      },
    ]
  })

  return result
}
