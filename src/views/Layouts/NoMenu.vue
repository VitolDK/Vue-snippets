<template lang="pug">
  v-app
    snackbar
    slot
</template>

<script>
import Snackbar from '@/components/Snackbar'
export default {
  name: 'Layout-noMenu',
  components: {
    Snackbar
  }
}
</script>
