<template lang="pug">
  .login
    v-form.login-form(v-model="valid", ref="loginForm")
      v-text-field.input(
        v-model="email",
        :label="$t('EMAIL.LABEL')",
        :rules="emailRules",
        placeholder=" "
        required,
        outlined,
        autocomplete="username"
        :readonly="loading",
      )
      .login-form__row
        v-text-field.input(
          v-model="password",
          :label="$t('PASSWORD.LABEL')",
          :append-icon="passShow ? 'visibility' : 'visibility_off'",
          :type="passShow ? 'text' : 'password'",
          @click:append="passShow = !passShow",
          :rules="passwordRules",
          required,
          outlined,
          autocomplete="current-password"
          placeholder=" ",
          :readonly="loading",
        )
        v-btn.pass-btn(color="primary", text, disabled) {{$t('COMMON.FORGET_PASSWORD')}}
      .btn__block
        q-btn-fluid(
          icon="people",
          @click="submitLoginForm",
          :loading="loading",
          :label="$t('BUTTON.SIGN_IN')"
        )
</template>

<script>
  import { login } from '@/api/auth'
  import { qBtnFluid } from '@/components/QButtons'
  import { toUpperSnakeCase } from '@/utils'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Login',
    components: {
      qBtnFluid
    },
    data() {
      return {
        passShow: false,
        valid: true,
        email: '',
        emailRules: [
          // v => !!v || this.$t('EMAIL.REQUIRED'),
          // v => /.+@.+/.test(v) || this.$t('EMAIL.NO_VALID')
        ],
        password: '',
        passwordRules: [
          v => !!v || ''/* this.$t('PASSWORD.REQUIRED') */
        ],
        listenerEnter: ({ keyCode }) => keyCode === 13 && !this.loading && this.submitLoginForm()
      }
    },
    computed: {
      showSuffix: function() {
        return this.email ? !this.email.includes('@') : true
      }
    },
    methods: {
      submitLoginForm() {
        if (this.valid) {
          login({ username: this.email, password: this.password })
            .then(({ data }) => { this.setTokens(data) })
            .catch(({ response: { data } }) => { this.nextMessage({ data }) })
        } else {
          this.$refs.loginForm.validate()
        }
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

<style lang="scss" scoped>
  @import "../../styles/variables";
  $number: random(3);

  .login {
    display: grid;
    grid-template-columns: minmax(840px, 40%) 1fr;
    height: 100%;
    .login-form {
      display: grid;
      grid-row-gap: 30px;
      width: 100%;
      &__row {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-column-gap: 10px;
        align-items: center;
        .pass-btn {
          height: 100%;
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
