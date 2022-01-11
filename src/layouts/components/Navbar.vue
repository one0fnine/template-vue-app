<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ user.fullName }}
            </p>
            <span class="user-status">{{ user.firstName }} {{ user.lastName }}</span>
          </div>
          <b-avatar
            badge
            :src="account.image.url"
            size="40"
            variant="light-primary"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="handleProfile"
        >
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="handleLogout"
        >
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import { BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar } from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    account() {
      return this.$store.getters['account/account']
    },
    user() {
      return this.account.user
    },
  },
  methods: {
    handleProfile() {
      this.$router.push({ name: 'profile' })
    },
    async handleLogout() {
      try {
        await this.$root.$api.$sign.signOut()
        localStorage.removeItem('authorization')
        localStorage.removeItem('JWToken')
        localStorage.removeItem('UserKey')
        this.$router.push({ name: 'sign_in' })
        this.$store.dispatch('account/setAccount', {})
      } catch (error) {
        console.error(error.message)
      }
    },
  },
}
</script>
