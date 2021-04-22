import moment from 'moment'
import 'moment-timezone'
import durationPlugin from 'moment-duration-format'
import { v4 as uuidv4 } from 'uuid'

durationPlugin(moment)

export function uuid() {
  return uuidv4()
}

export function momentLocale(locale) {
  moment.locale(locale)
}

export function now() {
  return moment()
}

export function timeZone() {
  return moment.tz.guess()
}

export function stringRemoveSpace(str) {
  return str ? str.replace(/\s/g, '') : ''
}

export function toUpperSnakeCase(value) {
  return value.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s/g, '').toUpperCase()
}

export function toKebabCase(value) {
  return value.replace(/_/g, '-').toLowerCase()
}

export function toCapitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function toCamelCase(value, split = '_') {
  if (value) {
    return value.split(split)
      .map((str, index) => !index ? str.toLowerCase() : str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase())
      .join('')
  }
  return value
}

export function dateFormat(value, format = null) {
  return value ? moment(value).format(format) : value
}

export function firstLetterUppercase(string) {
  return string && string[0].toUpperCase() + string.slice(1)
}
export function tailSize(value, separator) {
  return value && (value.toString().includes(separator)) ? (value.toString().split(separator).pop().length) : (0)
}