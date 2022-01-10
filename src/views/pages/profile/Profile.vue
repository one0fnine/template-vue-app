<template>
  <div id="user-profile">
    <b-row>
      <b-col md="6">
        <b-row>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="account.email" label="Email" disabled="disabled" />
          </b-col>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="account.user.fullName" label="Full Name" />
          </b-col>
          <b-col md="6" class="mb-2">
            <FormInputGroup :model.sync="account.company.name" label="Company Name" />
          </b-col>
          <b-col md="12" class="mb-2">
            <FormImageGroup
              :key="updater"
              :model="imagePreview"
              label="Profile Image"
              @update:image="onPickImage"
              @delete:image="onDeleteImage"
            />
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
      imagePreview: null,
      updater: 0,
    }
  },
	computed: {
		account() {
      return this.$store.getters['account/account']
		},
	},
  mounted() {
    this.imagePreview = this.account.photo.previewResourceUrl
    this.updater += 1
  },
  methods: {
    onDeleteImage() {
      this.account.photo._destroy = true
    },

    onPickImage(e) {
      this.imagePreview = e.imageData
      this.imageName = e.fileName
      this.signedId = e.signedId
      this.account.photo._destroy = false
    },

		async update() {
      if (this.signedId) {
        this.account.signedId = this.signedId
      }
      this.imageName = null
			try {
				await this.$store.dispatch('account/update', { data: this.account.toUpdateJSON() })
			} catch (err) {
				console.log(err)
			}
		},
	},
}
</script>
