<template>
  <b-form-group :label="label">
    <b-input-group>
      <b-form-input
        v-model="model"
        :state="state"
        :type="type"
        @input="update"
      />
      <b-input-group-append v-if="hasSlotAppend" is-text>
        <slot name="append" />
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
import { BFormGroup, BInputGroup, BFormInput, BInputGroupAppend } from 'bootstrap-vue'

export default {
	name: 'FormInputGroup',
	emits: ['input', 'update:model'],
	components: { BFormGroup, BInputGroup, BFormInput, BInputGroupAppend },
	props: {
		model: {
			type: String,
			required: true,
		},
		state: {
			type: Boolean,
			default: true,
		},
		label: {
			type: String,
			default: '',
		},
    type: {
			type: String,
			default: 'text',
		},
	},
	computed: {
    hasSlotAppend() {
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
