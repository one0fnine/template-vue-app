<template>
  <div>
    <FormInputGroup
      v-if="company"
      :model.sync="name"
      :state="!v$.name.$error"
      label="Name"
      @input="$emit('company:input', $event)"
    />
    <FormInputGroup
      v-if="company"
      :model.sync="address"
      :state="!v$.address.$error"
      label="Address"
      @input="$emit('company:input', $event)"
    />
    <FormInputGroup
      v-if="company"
      :model.sync="facebook"
      :state="!v$.facebook.$error"
      label="Facebook"
      @input="$emit('company:input', $event)"
    />
    <FormInputGroup
      v-if="company"
      :model.sync="instagram"
      :state="!v$.instagram.$error"
      label="Instagram"
      @input="$emit('company:input', $event)"
    />
    <FormInputGroup
      v-if="company"
      :model.sync="twitter"
      :state="!v$.twitter.$error"
      label="Twitter"
      @input="$emit('company:input', $event)"
    />
    <div class="d-flex justify-content-end">
      <b-button
        type="button"
        class="mr-1"
        variant="outline-secondary"
        @click="onCancel"
      >
        Cancel
      </b-button>
      <b-button
        type="button"
        variant="primary"
        @click="onSave"
      >
        Apply
      </b-button>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { BButton } from 'bootstrap-vue'
import FormInputGroup from '@/views/components/form/FormInputGroup.vue'
import Company from '@/models/Company'

export default {
  name: 'ManageCompany',
  components: { FormInputGroup, BButton },
  props: {
    company: {
      type: Company,
      default: () => new Company(),
    },
  },
  data() {
    return {
      name: this.company.name,
      address: this.company.location.address,
      facebook: this.company.social.facebook,
      instagram: this.company.social.instagram,
      twitter: this.company.social.twitter,
    }
  },
  methods: {
    onCancel() {
      this.$emit('company:cancel')
    },
    onSave() {
      this.$emit('company:save', {
        name: this.name,
        // location: {
        //   address: this.address,
        // },
        // social: {
        //   facebook: this.facebook,
        //   instagram: this.instagram,
        //   twitter: this.twitter,
        // },
      })
    },
  },
  validations() {
    return {
      name: {
        required,
        $autoDirty: true,
      },
      address: {
        required,
        $autoDirty: true,
      },
      facebook: {
        required,
        $autoDirty: true,
      },
      instagram: {
        required,
        $autoDirty: true,
      },
      twitter: {
        required,
        $autoDirty: true,
      },
    }
  },
  setup: () => ({ v$: useVuelidate() }),
}
</script>
