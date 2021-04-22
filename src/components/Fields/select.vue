<template lang="pug">
  .q-select
    v-select(v-on="attrs.on", v-bind="attrs.bind")
</template>

<script>
  import options from './mixin'

  export default {
    mixins: [options],
    name: 'selectField',
    data() {
      return {
        selectedValue: null,
        searchInput: '',
        isSearchActive: false,
        menuSelector: null
      }
    },
    props: {
      itemText: {
        type: [String, Array, Function],
        default: 'text'
      },
      itemValue: {
        type: [String, Array, Function],
        default: 'value'
      },
      searchable: {
        type: Boolean,
        default: false
      },
      itemsShowInSelection: {
        type: Number,
        default: 1
      },
       attach: null
    },
    computed: {
      isFunc: function() {
        return typeof this.itemText === 'function'
      },
      attrs: function () {
        const click = () => this.toggleSearchActive(true)
        const blur = () => this.toggleSearchActive(false)
        const change = () => this.toggleSearchActive(false)
        const searchableOn = this.searchable ? { click, blur, change } : {}
        const searchableBind = this.searchable ? { 'search-input.sync': this.searchInput } : {}
        return {
          on: {
            input: val => this.$emit('change', val, this.token),
            ...searchableOn
          },
          bind: {
            menuProps: {
              ...this.menuProps,
              offsetY: true
            },
            attach: this.attach,
            value: this.selectedValue,
            items: this.list,
            label: this.vLabel,
            itemText: this.itemText,
            itemValue: this.itemValue,
            rules: this.checkRules,
            disabled: this.disabled,
            multiple: this.multiple,
            returnObject: this.returnObject,
            loading: this.loading,
            smallChips: this.multiple,
            deletableChips: this.multiple,
            clearable: this.clearable,
            placeholder: this.vPlaceholder,
            errorMessages: this.vErrorMessages,
            hideDetails: this.hideDetails,
            itemDisabled: 'disabled',
            ...searchableBind
          }
        }
      }
    },
    watch: {
      value: {
        handler(val) {
          this.selectedValue = val || null
          this.$emit('input', this.selectedValue, this.token)
        },
        immediate: true
      }
    },
    methods: {
      remove(index) {
        this.selectedValue.splice(index, 1)
        this.$emit('change', this.selectedValue, this.token)
      },
      toggleSearchActive(state) {
        this.isSearchActive = state
      },
      viewText(item) {
        return this.isFunc ? this.itemText(item) : this.translateText('FIELDS.', item[this.itemText], false)
      }
    },
    mounted() {
      this.$nextTick(() => { this.setMenuWidth(true) })
    },
    destroyed() {
      this.setMenuWidth(false)
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../styles/variables";

  .q-select {
    position: relative;

    .v_select {
      height: 100%;
    }
  }

</style>
