<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1">
            Adventure starts here 🚀
          </b-card-title>
          <b-card-text class="mb-2">
            Make your app management easy and fun!
          </b-card-text>

          <!-- Form -->
          <b-form class="auth-register-form mt-2">

            <!-- First Name -->
            <b-form-group label="First Name" label-for="register-first-name">
              <b-form-input
                id="register-first-name"
                v-model="account.user.firstName"
                :state="!v$.account.user.firstName.$error"
                name="register-first-name"
                placeholder="John"
              />
            </b-form-group>
            <!-- /First Name -->

            <!-- Last Name -->
            <b-form-group label="Last Name" label-for="register-last-name">
              <b-form-input
                id="register-last-name"
                v-model="account.user.lastName"
                :state="!v$.account.user.lastName.$error"
                name="register-last-name"
                placeholder="Smith"
              />
            </b-form-group>
            <!-- /Last Name -->

            <!-- Company Name -->
            <b-form-group label="Company Name" label-for="register-company-name">
              <b-form-input
                id="register-company-name"
                v-model="account.company.name"
                :state="!v$.account.company.name.$error"
                name="register-company-name"
              />
            </b-form-group>
            <!-- /Company Name -->

            <!-- Company Consumer -->
            <b-form-group>
              <b-form-checkbox
                id="register-company-consumer"
                v-model="account.company.consumer"
                name="checkbox-consumer"
              >
                Consumer
              </b-form-checkbox>
            </b-form-group>
            <!-- /Company Consumer -->

            <!-- Company Producer -->
            <b-form-group>
              <b-form-checkbox
                id="register-company-producer"
                v-model="account.company.producer"
                name="checkbox-producer"
              >
                Producer
              </b-form-checkbox>
            </b-form-group>
            <!-- /Company Producer -->

            <!-- Email -->
            <b-form-group label="Email" label-for="register-email">
              <b-form-input
                id="register-email"
                v-model="account.email"
                :state="!v$.account.email.$error"
                name="register-email"
                placeholder="john@example.com"
              />
            </b-form-group>
            <!-- /Email -->

            <!-- Password -->
            <b-form-group label-for="register-password" label="Password">
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="register-password"
                  v-model="account.password"
                  :state="!v$.account.password.$error"
                  :type="passwordFieldType"
                  class="form-control-merge"
                  name="register-password"
                  placeholder="············"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIcon"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <!-- /Password -->

            <!-- Form Buttons -->
            <b-button
              block
              :disabled="invalid"
              variant="primary"
              type="button"
              @click="handleFormSubmit"
            >
              Sign up
            </b-button>
            <!-- /Form Buttons -->

          </b-form>
          <!-- /Form-->

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{name:'sign_in'}">
              <span>&nbsp;Sign in instead</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText } from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import Account from '@/models/Account'

export default {
	components: {
		BRow,
		BImg,
		BCol,
		BLink,
		BButton,
		BForm,
		BCardText,
		BCardTitle,
		BFormCheckbox,
		BFormGroup,
		BFormInput,
		BInputGroup,
		BInputGroupAppend,
	},
	mixins: [togglePasswordVisibility],
	data() {
		return {
      /* eslint-disable global-require */
			sideImg: require('@/assets/images/pages/register-v2.svg'),
      account: new Account(),
		}
	},
	computed: {
		passwordToggleIcon() {
			return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
		},
		imgUrl() {
			if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
				return this.sideImg
			}
			return this.sideImg
		},
	},
  mounted() {
    this.v$.$touch()
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      account: {
        user: {
          firstName: {
            required,
            $autoDirty: true,
          },
          lastName: {
            required,
            $autoDirty: true,
          },
        },
        company: {
          name: {
            required,
            $autoDirty: true,
          },
        },
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
	methods: {
    validate() {
      this.v$.$touch()
      return this.v$.$anyDirty && !this.v$.$invalid
    },
		async handleFormSubmit() {
      if (!this.validate()) {
        return
      }
			try {
				const authResponse = await this.$root.$api.$sign.signUp(this.account.toJSON())
        if (authResponse) {
          this.$root.$storage = localStorage
          this.$root.$storage.setItem('authorization', authResponse.authorization)
          this.$root.$api.token = authResponse.authorization
          this.$root.$auth.updateAuthUserData(authResponse.account, authResponse.authorization)
          await this.$store.dispatch('account/setAccount', authResponse.account)
          this.$router.push({ name: 'home' })
        }
			} catch (error) {
				console.log(error)
			}
		},
	},
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
