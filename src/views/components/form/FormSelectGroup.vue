<template>
  <b-form-group :label="label">
    <v-select
      v-model="model"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
      :options="options"
      :multiple="multiple"
      :label="optionsLabel"
      @input="update"
    />
  </b-form-group>
</template>

<script>
import { BFormGroup } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
	name: 'FormSelectGroup',
	emits: ['change', 'update:model'],
	components: { BFormGroup, vSelect },
	props: {
		model: {
			type: String,
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
		multiple: {
			type: Boolean,
			default: true,
		},
		label: {
			type: String,
			default: '',
		},
		optionsLabel: {
			type: String,
			default: '',
		},
	},
	methods: {
		update() {
			this.$emit('change', this.model)
			this.$emit('update:model', this.model)
		},
	},
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
