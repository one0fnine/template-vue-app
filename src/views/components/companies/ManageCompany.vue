<template>
  <div>
    <FormInputGroup
      v-if="company"
      :model.sync="name"
      :state="!v$.name.$error"
      label="Company Name"
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
    }
  },
  methods: {
    onCancel() {
      this.$emit('company:cancel')
    },
    onSave() {
      this.$emit('company:save', {
        name: this.name,
      })
    },
  },
  validations() {
    return {
      name: {
        required,
        $autoDirty: true,
      },
    }
  },
  setup: () => ({ v$: useVuelidate() }),
}
</script>
