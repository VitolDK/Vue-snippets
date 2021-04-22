<template lang="pug">
  v-app.layout--default
    side-bar
    main
      top-bar
      .wrap
        .app-container
          slot
        side-panel
    q-snackbar
    modal
</template>

<script>
import SidePanel from '@/components/SidePanel'
import Snackbar from '@/components/Snackbar'
import QSnackbar from '@/components/QSnackbar'
import Modal from '@/components/Modal'

export default {
  name: 'Layout-default',
  components: {
    SidePanel,
    Snackbar,
    QSnackbar,
    Modal
  }
}
</script>

<style lang="scss">
  .layout--default > .v-application--wrap {
    width: 100vw;
    height: 100vh;
    display: grid;
    overflow: hidden;
    grid-template-columns: auto 1fr;

    main {
      display: grid;
      height: 100vh;
    }
  }
  .blur {
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
    -webkit-filter: url(#icon-blur-filter);
    filter: url(#icon-blur-filter);
    -webkit-filter: blur(1px);
    filter: blur(1px);
  }
  .wrap {
    position: relative;
    height: initial;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .app-container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

</style>
