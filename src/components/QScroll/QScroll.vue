<template lang="pug">
  vue-scroll.scroll-container(
    ref="vuescroll"
    :class="{ hide, viewInitial }",
    :ops="options",
    @handle-resize="handleResize",
    @handle-scroll="$emit('handle-scroll', $event)",
    :style="cssVars")
    template
      slot
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'vue-property-decorator'
import vueScroll from 'vuescroll'

type Pos = {
  x?: number | string;
  y?: number | string;
}

declare type easing =
  | 'easeInQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'

@Component({
  components: { vueScroll }
})

export default class QScroll extends Vue {

  @Prop({ default: '', type: String }) readonly wrapper!: string
  @Prop({ default: 16, type: Number }) readonly verticalMargin!: number
  @Prop({ default: 16, type: Number }) readonly horizontalMargin!: number
  @Prop({ default: false, type: Boolean }) readonly hide!: boolean
  @Prop({ default: true, type: Boolean }) readonly scrollingX!: boolean
  @Prop({ default: true, type: Boolean }) readonly scrollingY!: boolean
  @Prop({ default: false, type: Boolean }) readonly wheelDirectionReverse!: boolean
  @Prop({ default: false, type: Boolean }) readonly viewInitial!: boolean

  @Ref() readonly vuescroll!: vueScroll

  get cssVars() {
    return {
      '--verticalMargin': `${this.verticalMargin}px`,
      '--horizontalMargin': `${this.horizontalMargin}px`
    }
  }

  get options() {
    const { scrollingX, scrollingY, wheelDirectionReverse } = this
    const size = '16px'
    return {
      rail: {
        size
      },
      bar: {
        size,
        background: null
      },
      scrollPanel: {
        scrollingX,
        scrollingY
      },
      vuescroll: {
        wheelDirectionReverse
      }
    }
  }

  handleResize(verticalScroll: number) {
    this.$emit('handle-scroll', verticalScroll)
  }
  scrollTo(position: Pos, speed = 500, easing: easing = 'easeInQuad') {
    this.vuescroll.scrollTo(position, speed, easing)
  }
  scrollToBottom() {
    this.scrollTo({ x: 0, y: this.contentHeight() })
  }
  contentHeight(): number {
    const [content] = this.vuescroll.getCurrentviewDom()
    return content && (content as HTMLInputElement).offsetHeight || 0
  }
}
</script>

<style lang="scss" src="./QScroll.scss" />
