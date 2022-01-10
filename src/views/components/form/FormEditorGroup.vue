<template>
  <b-form-group :label="label">
    <quill-editor
      v-model="model"
      :options="snowOption"
      @change="update"
    />
  </b-form-group>
</template>

<script>
import { BFormGroup } from 'bootstrap-vue'
import { quillEditor } from 'vue-quill-editor'

export default {
	name: 'FormEditorGroup',
	emits: ['change', 'update:model'],
	components: { BFormGroup, quillEditor },
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
	data() {
		return {
			snowOption: {
				theme: 'snow',
			},
		}
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
@import '@core/scss/vue/libs/quill.scss';
</style>
