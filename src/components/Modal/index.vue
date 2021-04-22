<template lang="pug">
  transition(v-if='open', name="fade-modal")
    .modal
      .modal__backdrop(v-if="backdrop", v-theme-class, @click.stop="hide")
      .modal__container(@click.stop="hide", :class="positionStyle")
        template(v-if="borderless")
          .modal__content.borderless(@click.stop)
            .modal__header
              .modal__header__title
                .text-lg.text--white.title(v-if="title") {{ title }}
                .text-lg.subtitle(v-if="subtitle") {{ subtitle }}
              close-icon.icon-white(@click.stop="close")
            .modal__body
              keep-alive
                component(:is="template", :data="data", v-bind="bind", v-on="events")
        template(v-else-if="custom")
          .modal__content.borderless(@click.stop)
            .modal__body
              keep-alive
                component(:is="template", :data="data", v-bind="bind", v-on="events")
        template(v-else)
          .modal__content.elevation-24(:style="{ width }", v-theme-class, @click.stop)
            .modal__header
              .modal__header__title
                .text-lg.title(v-if="title") {{ title }}
                .text-lg.subtitle(v-if="subtitle") {{ subtitle }}
              close-icon(@click.stop="close")
            .modal__body
              keep-alive
                component(:is="template", :data="data", v-bind="bind", v-on="events")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CloseIcon from '@/components/CloseIcon'

  export default {
    name: 'Modal',
    components: {
      CloseIcon
    },
    data() {
      return {
        canClose: false,
        listenerEnter: ({ keyCode }) => this.open && keyCode === 27 && this.close()
      }
    },
    computed: {
      ...mapGetters([
        'modal'
      ]),
      positionStyle: function() {
        console.log(`modal__container--${this.position}`)
        return [`modal__container--${this.position}`]
      },
      open: function() {
        return this.modal.open
      },
      position: function() {
        return this.modal.position
      },
      width: function() {
        return this.modal.width
      },
      bind: function() {
        return this.modal.bind
      },
      events: function() {
        return this.modal.events
      },
      backdrop: function() {
        return this.modal.backdrop
      },
      noClose: function() {
        return this.modal.noClose
      },
      title: function() {
        return this.modal.title
      },
      subtitle: function() {
        return this.modal.subtitle
      },
      template: function() {
        return this.modal.template
      },
      data: function() {
        return this.modal.data
      },
      borderless: function() {
        return this.modal.borderless
      },
      custom: function() {
        return this.modal.custom
      }
    },
    watch: {
      open: function(state) {
        // TODO Костыль для срабатывание закрытия модального окна
        setTimeout(() => { this.canClose = state })
      }
    },
    methods: {
      ...mapActions([
        'closeModal'
      ]),
      close() {
        this.canClose && this.closeModal()
      },
      hide() {
        !this.noClose && this.close()
      }
    },
    mounted() {
      document.addEventListener('keydown', this.listenerEnter)
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.listenerEnter)
    }
  }
</script>

<style lang="scss">
  @import "../../styles/variables";

  .fade-modal-enter-active, .fade-modal-leave-active {
    transition: transform .1s;
  }

  .fade-modal-enter {
    transform: translate(0, 100%);
  }

  .fade-modal-leave-to {
    transform: translate(0, 0);
  }

  .modal {
    top: 0;
    left: 0;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    position: fixed;

    &__backdrop {
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      position: absolute;
      background: transparent linear-gradient(#131A40 0%, #1976D2 51%, #B8CFE0 100%);
      opacity: 0.8;
    }

    &__container {
      display: flex;
      width: inherit;
      height: inherit;
      justify-content: center;

      &--center {
        align-items: center;
      }

      &--bottom {
        align-items: flex-end;

        .modal__content {
          margin-bottom: 200px;
        }
      }

      &--top {
        align-items: flex-start;

        .modal__content {
          margin-top: 200px;
        }
      }
    }

    &__content {
      z-index: 1;
      position: relative;

      .icon-white {
        svg {
          fill: $white;
        }
      }

      &.theme {
        &--light {
          background-color: $layout-bg-light;
        }

        &--dark {
          background-color: $layout-bg-dark;
        }
      }
    }

    &__header {
      display: grid;
      align-items: center;
      padding: 28px $layout-offset $layout-offset / 2;
      grid-template-columns: 1fr auto;
      &__title {
        font-size: 20px;
        line-height: 26px;
        font-weight: 500;
      }
    }

    &__body {
      z-index: 2002;
      position: relative;
      padding: 0 $layout-offset $padding;
    }
  }
</style>
