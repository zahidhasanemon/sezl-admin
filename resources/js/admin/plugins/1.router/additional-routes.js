// 👉 Redirects
export const redirects = [
  {
    path: '/',
    name: 'index',
    redirect: to => {
      const userData = useCookie('userData')
      if (userData.value?.id)
        return { name: 'dashboard' }

      return { name: 'login', query: to.query }
    },
  },
  {
    path: '/pages/user-profile',
    name: 'pages-user-profile',
    redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  },
]
export const routes = [
]
