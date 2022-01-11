<template>
  <b-form-group>
    <b-form-checkbox
      v-model="model"
      @input="update"
    >
      {{ label }}
    </b-form-checkbox>
  </b-form-group>
</template>

<script>
import { BFormGroup, BFormCheckbox } from 'bootstrap-vue'

export default {
	name: 'FormCheckboxGroup',
	emits: ['input', 'update:model'],
	components: { BFormGroup, BFormCheckbox },
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
