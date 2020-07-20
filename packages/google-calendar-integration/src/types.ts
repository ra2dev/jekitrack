export interface ReportType {
  ticket: string
  time: number
  actions?: {
    [key: string]: string[]
  }
}

export interface ReportGroupType {
  [key: string]: ReportType[]
}
