<template>
  <div id="user-profile">
    <b-row>
      <b-col md="6">
        <b-row>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="user.username" label="Username" />
          </b-col>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="user.email" label="Email" disabled="disabled" />
          </b-col>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="user.firstName" label="First Name" />
          </b-col>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="user.lastName" label="Last Name" />
          </b-col>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="user.phone" label="Phone" />
          </b-col>
          <b-col md="12" class="mb-2">
            <FormImageGroup :model.sync="file" :image.sync="user.photo" label="Profile Image" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12" class="mt-50">
        <b-button
          v-ripple
          variant="primary"
          class="mr-1"
          @click="update"
        >
          Save Changes
        </b-button>
        <b-button
          v-ripple
          variant="outline-secondary"
          @click="$router.go(-1)"
        >
          Cancel
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BButton } from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import FormInputGroup from '@/views/components/form/FormInputGroup.vue'
import FormImageGroup from '@/views/components/form/FormImageGroup.vue'

export default {
	name: 'Profile',
  components: {
    BRow,
    BCol,
		BButton,
		FormInputGroup,
		FormImageGroup,
  },
  data() {
    return {
			file: null,
    }
  },
	computed: {
		user: {
			get() {
				return this.$store.getters['user/user']
			},
			set(data) {
				this.$store.dispatch('user/setUser', data)
			},
		},
	},
	methods: {
		async update() {
			try {
				await this.$store.dispatch('user/updateUser', { data: this.user.toUpdateJSON() })
				this.$toast({
					component: ToastificationContent,
					props: {
						title: 'Form Submitted',
						icon: 'EditIcon',
						variant: 'success',
					},
				})
			} catch (err) {
				console.log(err)
			}
		},
	},
}
</script>
