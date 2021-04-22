<script>
  import { dateFormat, timeToX, now } from '@/utils'
  export default {
    name: 'Date',
    props: {
      value: {
        type: String,
        default: null
      },
      format: {
        type: String,
        default: 'DD.MM.YYYY'
      },
      prefix: {
        type: String,
        default: ''
      },
      postfix: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: 'span'
      },
      altText: {
        type: String,
        default: ''
      },
      timeTo: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      date() {
        const { value, format, timeTo } = this
        return !timeTo ? dateFormat(value, format) : timeToX(now(), value)
      },
      formatting: function () {
        const { date, prefix, postfix } = this
        const vPrefix = prefix ? `${prefix} ` : ''
        const vPostfix = postfix ? ` ${postfix}` : ''
        return vPrefix + date + vPostfix
      }
    },
    render: function (createElement) {
      return createElement(
        this.tag,
        {
          staticClass: 'text-no-wrap',
          domProps: {
            innerHTML: this.value ? this.formatting : this.altText
          }
        }
      )
    }
  }
</script>
