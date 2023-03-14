import { User } from '../entities/user.entity';

export interface UserPresentationResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export const userPresentation = (user: User): UserPresentationResponse => {
  return {
    user: {
      id: user.id,
      email: user.email.value,
      first_name: user.firstName.value,
      last_name: user.lastName.value,
      avatar: user.avatar,
    },
  };
};
