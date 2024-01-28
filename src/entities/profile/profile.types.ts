export interface IUserProfile {
  id: number | undefined;
  image: string;
  name: string | undefined;
  about: string;
  birthDate: string;
  email: string | undefined;
}

export const sidebar_profile_types = {
  editProfile: {
    icon: 'editProfile',
    label: 'Edit profile',
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
