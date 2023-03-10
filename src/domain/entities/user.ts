import { Replace } from '../helpers/replacerType';
import { Email } from './email';
import { Name } from './name';

export type UserProps = {
  id?: number;
  email: Email;
  first_name: Name;
  last_name: Name;
  avatar?: string;
  createdAt: Date;
};

export class User {
  #user: UserProps;

  constructor(user: Replace<UserProps, { createdAt?: Date }>) {
    this.#user = {
      ...user,
      createdAt: this.#user?.createdAt ?? new Date(),
    };
  }

  set createdAt(createdAt: Date) {
    this.#user.createdAt = createdAt;
  }

  get createdAt(): Date {
    return this.#user.createdAt;
  }

  public set email(email: Email) {
    this.#user.email = email;
  }

  public get email(): Email {
    return this.#user.email;
  }

  public set firstName(firstName: Name) {
    this.#user.first_name = firstName;
  }

  public get firstName(): Name {
    return this.#user.first_name;
  }

  public set lastName(lastName: Name) {
    this.#user.last_name = lastName;
  }

  public get lastName(): Name {
    return this.#user.last_name;
  }

  public set avatar(avatar: string) {
    this.#user.avatar = avatar;
  }

  public get avatar(): string {
    return this.#user.avatar;
  }
}
