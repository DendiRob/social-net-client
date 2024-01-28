export default [
  {
    path: '',
    name: 'settings-main',
    components: {
      default: () => import('pages/settings/ui/SettingsPageMain'),
      sidebar: () => import('pages/settings/ui/SettingsSidebar')
    }
  },
  {
    path: 'profile-editing',
    name: 'profile-editing',
    components: {
      default: () => import('pages/settings/ui/SettingsPageMain'),
      sidebar: () => import('pages/settings/ui/SettingsSidebar')
    }
  },
  {
    path: 'profile-communities',
    name: 'profile-communities',
    components: {
      default: () => import('pages/contacts/ui/ContactsPage'),
      sidebar: () => import('pages/settings/ui/SettingsSidebar')
    }
  },
  {
    path: 'profile-invite-friends',
    name: 'profile-invite-friends',
    components: {
      default: () => import('pages/settings/ui/SettingsPageMain'),
      sidebar: () => import('pages/settings/ui/SettingsSidebar')
    }
  }
];
