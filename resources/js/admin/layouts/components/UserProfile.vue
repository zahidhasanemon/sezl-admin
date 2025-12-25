<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from "pinia"
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const router = useRouter()
const ability = useAbility()
const authStore = useAuthStore()

// TODO: Get type from backend
const { adminData } = storeToRefs(authStore)

const logout = () => {
  // Use auth store to handle logout
  authStore.adminLogout()

  // Reset ability to initial ability
  ability.update([])

  // Redirect to login page
  router.push('/login')
}

const userProfileList = [
  { type: 'divider' },

  // {
  //   type: 'navItem',
  //   icon: 'tabler-user',
  //   title: 'Profile',
  //   to: {
  //     name: 'apps-user-view-id',
  //     params: { id: 21 },
  //   },
  // },
]
</script>

<template>
  <VBadge v-if="adminData" dot bordered location="bottom right" offset-x="1" offset-y="2" color="success">
    <VAvatar size="38" class="cursor-pointer" :color="!(adminData && adminData.avatar) ? 'primary' : undefined"
      :variant="!(adminData && adminData.avatar) ? 'tonal' : undefined">
      <VImg v-if="adminData && adminData.avatar" :src="adminData.avatar" />
      <VIcon v-else icon="tabler-user" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="240" location="bottom end" offset="12px">
        <VList>
          <VListItem>
            <div class="d-flex gap-2 align-center">
              <VListItemAction>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
                  <VAvatar :color="!(adminData && adminData.avatar) ? 'primary' : undefined"
                    :variant="!(adminData && adminData.avatar) ? 'tonal' : undefined">
                    <VImg v-if="adminData && adminData.avatar" :src="adminData.avatar" />
                    <VIcon v-else icon="tabler-user" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>

              <div>
                <h6 class="text-h6 font-weight-medium">
                  {{ adminData.name }}
                </h6>
                <VListItemSubtitle class="text-xs text-disabled">
                  {{ adminData.email }}
                </VListItemSubtitle>
              </div>
            </div>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template v-for="item in userProfileList" :key="item.title">
              <VListItem v-if="item.type === 'navItem'" :to="item.to">
                <template #prepend>
                  <VIcon :icon="item.icon" size="22" />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template v-if="item.badgeProps" #append>
                  <VBadge rounded="sm" class="me-3" v-bind="item.badgeProps" />
                </template>
              </VListItem>

              <VDivider v-else class="my-2" />
            </template>

            <div class="px-4 py-2">
              <VBtn block size="small" color="error" append-icon="tabler-logout" @click="logout">
                Logout
              </VBtn>
            </div>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
