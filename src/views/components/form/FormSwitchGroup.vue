<template>
  <b-form-group :label="label">
    <b-form-checkbox
      v-model="model"
      switch
      @input="update"
    >
      <template #default>
        <slot />
      </template>
    </b-form-checkbox>

  </b-form-group>
</template>

<script>
import { BFormGroup, BFormCheckbox } from 'bootstrap-vue'

export default {
	name: 'FormSwitchGroup',
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
		options: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		_model() {
			return this.model ? this.options[0] : this.options[1]
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
