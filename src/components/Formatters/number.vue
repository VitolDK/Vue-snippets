<script>
  export default {
    name: 'Number',
    props: {
      value: {
        type: [Number, String],
        default: null,
        validate: number => isNaN(number)
      },
      precision: {
        type: Number,
        default: null,
        validate: number => isNaN(number)
      },
      separator: {
        type: String,
        default: '<span style="padding: 0 2px; user-select: none"></span>'
      },
      price: {
        type: Boolean,
        default: false
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
      }
    },
    computed: {
      formatting: function () {
        const { value, precision, separator, price } = this
        const prefix = this.prefix ? this.prefix + separator : ''
        const postfix = this.postfix ? separator + this.postfix : ''
        const [num, numShot = ''] = String(value).split('.')
        const collected = Number(`${num}.${numShot.substr(0, precision)}`)
        const newValue = price ? collected.toFixed(precision) : collected
        const decimal = price || ((newValue - Math.floor(newValue)) !== 0) && (precision > 0)
        const re = '(\\d)(?=(\\d{' + 3 + '})+' + (decimal ? '\\.' : '$') + ')'
        return value || value === 0 ? String(prefix + newValue)
          .replace(new RegExp(re, 'g'), `$1${separator}`) + postfix : null
      }
    },
    render: function (createElement) {
      return createElement(
        this.tag,
        {
          staticClass: 'text-no-wrap',
          domProps: {
            innerHTML: this.formatting
          }
        }
      )
    }
  }
</script>
