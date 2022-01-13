<template>
  <div>
    <b-card no-body>
      <b-row class="my-1">
        <b-col>
          <b-button
            v-ripple
            variant="success"
            class="ml-auto d-block mr-1"
            @click="onCreate"
          >
            <feather-icon icon="PlusSquareIcon" class="mr-50" />
            <span class="text-nowrap">Add Company</span>
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            :busy="isLoading"
            :items="companies"
            :fields="['name', 'address', 'facebook', 'instagram', 'twitter', 'actions']"
            responsive
            striped
            bordered
            small
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
            <template #head(actions)>
              <div class="text-center">
                Actions
              </div>
            </template>
            <template #cell(actions)="data">
              <div class="text-center">
                <b-dropdown variant="link" no-caret>
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                  </template>
                  <b-dropdown-item @click="onEdit(data.item)">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="onDelete(data.item)">
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">Delete</span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <!-- Pagination -->
      <PaginationBlock
        :meta.sync="meta"
        @update:meta="onChangePagination"
      />
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
        @company:save="save"
      />
    </b-modal>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { BRow, BCol, BCard, BTable, BModal, BDropdown, BDropdownItem, BButton } from 'bootstrap-vue'
import Company from '@/models/Company'
import ManageCompany from '@/views/components/companies/ManageCompany.vue'
import PaginationBlock from '@/views/components/pagination/PaginationBlock.vue'

export default {
  name: 'Companies',
  components: { BRow, BCol, BCard, BTable, BModal, BDropdown, BDropdownItem, BButton, ManageCompany, PaginationBlock },
  data() {
    return {
      type: 'create',
      isLoading: true,
      isModalActive: false,
    }
  },
  computed: {
    meta: {
      get() {
        return this.$store.getters['company/meta']
      },
      set(meta) {
        this.$store.commit('company/SET_COMPANY_META', meta)
      },
    },
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
    onCreate() {
      this.type = 'create'
      this.isModalActive = true
    },
    onDelete($event) {
      this.delete($event)
    },
    async onChangePagination() {
      this.isLoading = true
      await this.$store.dispatch('company/list')
      this.isLoading = false
    },

    async delete(company) {
      try {
        this.isLoading = true
        await this.$root.$store.dispatch('company/delete', { id: company.id })
      } catch (err) {
        console.error(err.toString())
      }
      await this.$store.dispatch('company/list')
      this.isLoading = false
    },

    async save($event) {
      if (!this.validate()) {
        return
      }
      this.isModalActive = false
      try {
        if (this.type === 'create') {
          const data = this.company.toJSON($event)
          await this.$root.$store.dispatch('company/create', { data })
        } else {
          const data = { id: this.company.id, data: this.company.toUpdateJSON($event) }
          await this.$root.$store.dispatch('company/update', data)
        }
      } catch (err) {
        console.error(err.toString())
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
