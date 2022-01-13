<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img :src="imgUrl" alt="Login V2" fluid />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <!-- form -->
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!-- email -->
            <FormInputGroup
              :model.sync="account.email"
              :state="!v$.account.email.$error"
              label="Email"
            />
            <FormInputGroup
              :model.sync="account.password"
              :state="!v$.account.password.$error"
              :type="passwordFieldType"
              label="Password"
            >
              <template #append>
                <feather-icon
                  :icon="passwordToggleIcon"
                  class="cursor-pointer"
                  @click="togglePasswordVisibility"
                />
              </template>
            </FormInputGroup>
            <!-- forgot password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <b-link :to="{name:'auth-forgot-password-v2'}">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
            </b-form-group>

            <!-- submit buttons -->
            <b-button
              block
              type="button"
              variant="primary"
              @click="handleFormSubmit"
            >
              Sign in
            </b-button>
          </b-form>

          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'sign_up'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BLink, BFormGroup, BCardText, BCardTitle, BImg, BForm, BButton } from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import Account from '@/models/Account'
import { FormInputGroup } from '@/views/components/form'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    FormInputGroup,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      /* eslint-disable global-require */
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      account: new Account(),
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      account: {
        email: {
          required,
          email,
          $autoDirty: true,
        },
        password: {
          required,
          $autoDirty: true,
        },
      },
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validateForm() {
      this.v$.$touch()
      return this.v$.$anyDirty && !this.v$.$invalid
    },
		async handleFormSubmit() {
      if (!this.validateForm()) {
        return
      }
			try {
				const authResponse = await this.$root.$api.$sign.signIn(this.account.toLoginJSON())
				if (authResponse) {
					this.$root.$storage = localStorage
					this.$root.$storage.setItem('authorization', authResponse.authorization)
					this.$root.$api.token = authResponse.authorization
					this.$root.$auth.updateAuthUserData(authResponse.account, authResponse.authorization)
					await this.$store.dispatch('account/detail')
          this.$router.push({ name: 'home' })
				}
			} catch (error) {
				console.log(error)
			}
		},
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
