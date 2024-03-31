export const sidebar_profile_types = {
  editProfile: {
    icon: 'editProfile',
    label: 'Редактировать профиль',
    routeName: 'profile-editing'
  },
  communities: {
    icon: 'communities',
    label: 'Communities',
    routeName: 'profile-communities'
  },
  inviteFriends: {
    icon: 'inviteFriends',
    label: 'Invite friends',
    routeName: 'profile-invite-friends'
  }
};

export interface IUserProfile {
  email: string;
  nickname: string;
  avatarId: number | null;
}
