<template lang="pug">
    v-snackbar(v-model="show", v-bind="options", @click.stop) {{text}}
      v-btn(v-if="canClose", text, icon, @click.stop="hideMessage()")
        svg-icon.close(icon="close")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Snackbar',
    computed: {
      ...mapGetters([
        'message'
      ]),
      show: {
        get: function() {
          return this.message.show
        },
        set: function(state) {
          this.showMessage(state)
        }
      },
      options: function() {
        return this.message.options
      },
      text: function() {
        return this.message.text
      },
      canClose: function() {
        return this.message.canClose
      }
    },
    methods: {
      ...mapActions([
        'hideMessage',
        'showMessage'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  .v-snack {
    z-index: 999999;
  }

  .close {
    $s: 32px;
    width: $s;
    height: $s;
    fill: $white;
    padding: 5px;
    box-sizing: content-box;
  }
</style>
