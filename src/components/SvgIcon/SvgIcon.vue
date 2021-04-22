<template lang="pug">
  svg(
    v-theme-class,
    :class="svgClass",
    :style="iconSize",
    aria-hidden="true",
    @click="$emit('click', $event)")
    use(:xlink:href="iconName")
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class SvgIcon extends Vue  {
    @Prop({ type: String, default: '' }) icon!: string
    @Prop({ type: [String, Number], default: '' }) size!: string | number
    @Prop({ type: String, default: '' }) className!: string

    get iconName() {
      return `#icon-${this.icon}`
    }
    get iconSize() {
      if (this.size === 'small') {
        return { width: '12px', height: '12px' }
      }
      const size = isNaN(Number(this.size)) ? this.size : this.size + 'px'
      return { width: size, height: size }
    }
    get svgClass() {
      return this.className ? 'svg-icon ' + this.className : 'svg-icon'
    }

  }
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 32px;
    height: 32px;
  }
</style>
