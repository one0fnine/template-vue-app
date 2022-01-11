<template>
  <div>
    <b-card v-if="!isLoading">
      <b-row>
        <b-col>
          <b-table
            hover
            :small="true"
            :items="companies"
            :fields="['address', 'name', 'facebook', 'instagram', 'twitter']"
            @row-clicked="onEdit"
          >
            <template #cell(address)="data">
              {{ data.item.location.address }}
            </template>
            <template #cell(instagram)="data">
              {{ data.item.social.instagram }}
            </template>
            <template #cell(twitter)="data">
              {{ data.item.social.twitter }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>

    <b-modal
      hide-footer
      :visible="isModalActive"
      title="Edit Company"
      @change="(val) => isModalActive = val"
    >
      <ManageCompany
        :company.sync="company"
        @company:cancel="isModalActive = false"
        @company:save="saveCompany"
      />
    </b-modal>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { BRow, BCol, BCard, BTable, BModal } from 'bootstrap-vue'
import Company from '@/models/Company'
import ManageCompany from '@/views/components/companies/ManageCompany.vue'

export default {
  name: 'Companies',
  components: { BRow, BCol, BCard, BTable, BModal, ManageCompany },
  data() {
    return {
      type: 'create',
      isLoading: true,
      isModalActive: false,
    }
  },
  computed: {
    company() {
      return this.type === 'edit' ? this.$store.getters['company/company'] : new Company()
    },
    companies() {
      return this.$store.getters['company/list'].asArray()
    },
  },
  async mounted() {
    await this.$store.dispatch('company/list')
    this.isLoading = false
  },
  methods: {
    onEdit($event) {
      this.type = 'edit'
      this.$store.getters['company/companyById']($event.id)
      this.isModalActive = true
    },

    async saveCompany($event) {
      if (!this.validate()) {
        return
      }
      this.isModalActive = false
      try {
        if (this.type === 'create') {
          const cData = this.company.toJSON($event)
          await this.$root.$store.dispatch('company/create', cData)
        } else {
          const cData = this.company.toUpdateJSON($event)
          const data = { id: this.company.id, data: cData }
          await this.$root.$store.dispatch('company/update', data)
        }
      } catch (err) {
        console.error(err)
      }
      await this.$store.dispatch('company/list')
    },

    validate() {
      this.v$.$touch()
      return this.v$.$anyDirty && !this.v$.$invalid
    },
  },
  setup: () => ({ v$: useVuelidate() }),
}
</script>
