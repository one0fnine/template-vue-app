<template>
  <b-form-group :label="label">
    <b-media no-body vertical-align="center" class="flex-column flex-md-row">
      <b-media-aside>
        <b-img
          :src="image"
          height="110"
          width="170"
          class="rounded mr-2 mb-1 mb-md-0"
        />
      </b-media-aside>
      <b-media-body>
        <b-form-file
          v-model="model"
          accept=".jpg, .png, .gif"
          placeholder="Choose file"
          @input="createPic"
        />
        <small class="text-muted">Required image resolution 800x400, image size 10mb.</small>
      </b-media-body>
    </b-media>
  </b-form-group>
</template>

<script>
import {
 BFormGroup, BFormFile, BImg, BMediaBody, BMedia, BMediaAside,
} from 'bootstrap-vue'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'

export default {
	name: 'FormImageGroup',
	emits: ['input', 'update:model'],
	components: {
 BFormGroup, BFormFile, BImg, BMediaBody, BMedia, BMediaAside,
},
	props: {
		model: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
	},
	methods: {
		createPic(file) {
			const callback = async (base64) => {
				this.image = base64
				this.update()
			}
			const height = 1080
			const width = 1920
			const { inputImageRenderer } = useInputImageRenderer(file, callback, height, width, 'cover')
			inputImageRenderer()
		},

		update() {
			this.$emit('input', this.model)
			this.$emit('update:model', this.model)
			this.$emit('update:image', this.image)
		},
	},
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>
