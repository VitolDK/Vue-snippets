<template lang="pug">
  span(v-if="text && text.length", v-html="$tc(text, params) ? $t(text, params) : text")
</template>

<script>
  export default {
    name: 'Translate',
    props: {
      text: {
        type: String,
        default: null
      },
      params: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>
