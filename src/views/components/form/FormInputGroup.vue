<template>
  <b-form-group :label="label">
    <b-input-group>
      <template v-if="hasAppendSlot" #append>
        <slot name="append" />
      </template>
      <b-form-input
        v-model="model"
        @input="update"
      />
    </b-input-group>
  </b-form-group>
</template>

<script>
import { BFormGroup, BInputGroup, BFormInput } from 'bootstrap-vue'

export default {
	name: 'FormInputGroup',
	emits: ['input', 'update:model'],
	components: { BFormGroup, BInputGroup, BFormInput },
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
	computed: {
		hasAppendSlot() {
			return this.$slots.append != null
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
