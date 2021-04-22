<template lang="pug">
  #app
    component(:is="layout")
      router-view
</template>

<script>
  let defaultLayout = 'noMenu'
  export default {
    name: 'App',
    computed: {
      layout: function() {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      }
    },
    created() {
      this.$nextTick(() => { defaultLayout = 'default' })
    }
  }
</script>
