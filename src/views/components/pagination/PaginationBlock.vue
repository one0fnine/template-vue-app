<template>
  <div class="m-2 mt-0">
    <b-row>
      <b-col cols="12" md="2" class="mb-1 mb-md-0">
        <v-select
          v-model="meta.page.per_page"
          :searchable="false"
          :clearable="false"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="perPageList"
          label="title"
          style="width: 80px"
          @option:selected="onChangePerPage"
        />
      </b-col>
      <b-col cols="12" md="10" class="d-flex justify-content-start justify-content-md-end">
        <b-pagination
          v-if="meta.page.total > meta.page.per_page"
          v-model="meta.page.current_page"
          :total-rows="meta.page.total"
          :per-page="meta.page.per_page"
          prev-class="prev-item"
          next-class="next-item"
          first-number
          last-number
          @change="onChangePage"
        >
          <template #prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import 'vue-slider-component/theme/material.css'
import { BPagination, BRow, BCol } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  name: 'PaginationBlock',
  emits: ['update:meta'],
  components: { BPagination, BRow, BCol, vSelect },
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onChangePerPage() {
      this.meta.page.current_page = 1
      this.update()
    },
    onChangePage(page) {
      this.meta.page.current_page = page
      this.update()
    },
    update() {
      this.$emit('update:meta', this.meta)
    },
  },
  setup() {
    const perPageList = [5, 10, 15, 25, 50]
    return {
      perPageList,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
