import { toUpperSnakeCase, isDevelopment } from '@/utils'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return { menuProps: { maxWidth: '100%' } }
  },
  props: {
    precision: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: [String, Object, Number, Array],
      default: null
    },
    list: {
      type: Array,
      default: null
    },
    itemText: {
      type: String,
      default: 'name'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    placeholder: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    noRules: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: true
    },
    validationMessage: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    hideNoData: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: [Number, String],
      default: null
    },
    debounce: {
      type: Number,
      default: 750
    },
    outlined: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    vLabel: function() {
      return this.translateText('FIELDS.LABELS.', this.label)
    },
    vPlaceholder: function() {
      return this.placeholder ? this.translateText('FIELDS.PLACEHOLDERS.', this.placeholder) : this.disabled ? '' : '—'
    },
    checkRules: function() {
      const required = v => !!v || this.$t('COMMON.REQUIRED_FIELD')
      return this.valid && !this.noRules && this.required ? [...this.rules, required] : []
    },
    vErrorMessages: function() {
      return !this.valid && this.validationMessage ? [this.translateText('ERRORS.', this.validationMessage)] : []
    },
    token: function() {
      return uuidv4()
    },
  },
  methods: {
    widthEventListener() {
      this.$set(this.menuProps, 'maxWidth', this.$el.clientWidth || '100%')
    },
    setMenuWidth(state) {
      if (this.$el) {
        state && this.widthEventListener()
        window[state ? 'addEventListener': 'removeEventListener']('resize', this.widthEventListener)
      }
    },
    translateText(alias, text, showWarning = true) {
      const textAlias = toUpperSnakeCase(alias + text)
      if (text) {
        if (this.$te(textAlias)) {
          return this.$t(textAlias)
        } else {
          isDevelopment() && showWarning && console.warn(`${text}: ${textAlias}`)
          return text
        }
      }
      return null
    }
  }
}
