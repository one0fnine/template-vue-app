<template>
  <b-form-group :label="label">
    <b-media no-body vertical-align="center" class="flex-column flex-md-row">
      <b-media-aside>
        <b-img
          :src="imagePreview"
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
          @input="readImage"
        />
        <small class="text-muted">Required image resolution 800x400, image size 10mb.</small>
      </b-media-body>
    </b-media>
  </b-form-group>
</template>

<script>
import getImageDimensions from '@/utils/getImageDimensions'
import { BFormGroup, BFormFile, BImg, BMediaBody, BMedia, BMediaAside } from 'bootstrap-vue'

export default {
	name: 'FormImageGroup',
	emits: ['input', 'update:model', 'update:image', 'delete:image', 'load:image'],
	components: { BFormGroup, BFormFile, BImg, BMediaBody, BMedia, BMediaAside },
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
    console.log(this.model)
    return {
      imagePreview: this.model || null,
    }
  },
	methods: {
    onRemoveImage() {
      this.imagePreview = null
      this.$emit('update:model', this.model)
      this.$emit('delete:image')
    },

    async uploadImage() {
      if (this.imageName && this.imagePreview) {
        const avatar = await this.uploadDirect(this.imageName, this.imagePreview)
        this.signedId = avatar.data.attributes.signed_id
        this.imageName = null
      }
    },

    async uploadDirect(imageName, imageData64) {
      try {
        const uploadResponse = await this.$root.$api.$uploads.direct(imageName, imageData64)
        return uploadResponse || null
      } catch (e) {
        console.error(e.toString())
      }
      return null
    },

    async handleInput() {
      this.$emit('load:image', false)
      await this.uploadImage()
      const val = {
        imageData: this.imagePreview,
        fileName: this.imageName,
        signedId: this.signedId,
        w: this.imageW,
        h: this.imageH,
      }
      this.$emit('update:modelValue', val.imageData)
      this.$emit('input', val.imageData)
      this.$emit('update:image', val)
      this.$emit('load:image', true)
    },

    async readImage(e) {
      const file = e
      const reader = new FileReader()

      if (file) {
        reader.onloadend = async () => {
          this.imagePreview = reader.result
          this.imageName = file.name
          const size = await getImageDimensions(this.imagePreview)
          this.imageW = size.w
          this.imageH = size.h
          this.handleInput()
        }

        await reader.readAsDataURL(file)
      } else {
        this.imagePreview = null
        this.imageName = null
        this.imageW = 0
        this.imageH = 0
      }
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
