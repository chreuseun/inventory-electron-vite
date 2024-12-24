import { IDateFormats } from '@renderer/interfaces/dateFormat.interface'
import moment from 'moment'

export const formatDate: (date: string, format?: IDateFormats) => string = (
  date,
  format = IDateFormats.YYYYMMDDhhmmss
) => {
  try {
    return `${moment(date).format(format)}`
  } catch {
    return date
  }
}
