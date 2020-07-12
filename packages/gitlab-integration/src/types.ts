enum EventActionType {
  CREATED = 'created',
  UPDATED = 'updated',
  CLOSED = 'closed',
  REOPENED = 'reopened',
  PUSHED = 'pushed',
  COMMENTED = 'commented',
  MERGED = 'merged',
  JOINED = 'joined',
  LEFT = 'left',
  DESTROYED = 'destroyed',
  EXPIRED = 'expired',
}

export interface ReportType {
  ticket: string
  actions?: {
    [key: string]: string[]
  }
}

export interface ReportGroupType {
  [key: string]: ReportType[]
}
