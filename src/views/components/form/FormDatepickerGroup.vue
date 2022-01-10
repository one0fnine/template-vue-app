<template>
  <b-form-group :label="label">
    <b-form-datepicker
      v-model="model"
      @input="update"
    />
  </b-form-group>
</template>

<script>
import { BFormGroup, BFormDatepicker } from 'bootstrap-vue'

export default {
	name: 'FormDatepickerGroup',
	emits: ['input', 'update:model'],
	components: { BFormGroup, BFormDatepicker },
	props: {
		model: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
	},
	methods: {
		update() {
			this.$emit('input', this.model)
			this.$emit('update:model', this.model)
		},
	},
}
</script>
