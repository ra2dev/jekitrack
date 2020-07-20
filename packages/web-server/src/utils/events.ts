import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import addDays from 'date-fns/addDays'

export const mergeEvents = (...events: any[]) => {
  const result: any = {}
  events.forEach((event) => {
    Object.keys(event).forEach((k) => {
      result[k] = [...(result[k] || []), ...(event[k] || [])]
    })
  })
  return result
}

export const getDateRange = () => {
  const date = addDays(new Date(), -2)
  const [after, before] = [startOfWeek(date, { weekStartsOn: 1 } as any), endOfWeek(date, { weekStartsOn: 1 } as any)]
  return { after, before }
}
