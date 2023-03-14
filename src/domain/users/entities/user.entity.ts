import { Email } from './email.entity';
import { Username } from './userName.entity';

interface UserProps {
  id?: string;
  first_name: Username;
  last_name: Username;
  external_id?: number;
  avatar?: string;
  email: Email;
  created_at?: Date;
}

export class User {
  constructor(private user: UserProps) {}

  get id(): string {
    return this.user.id;
  }

  public set firstName(firstName: Username) {
    this.user.first_name = firstName;
  }

  public get firstName(): Username {
    return this.user.first_name;
  }

  public set lastName(lastName: Username) {
    this.user.last_name = lastName;
  }
  public get lastName(): Username {
    return this.user.last_name;
  }
  public set email(email: Email) {
    this.user.email = email;
  }
  public get email(): Email {
    return this.user.email;
  }
  public set avatar(avatar: string) {
    this.user.avatar = avatar;
  }
  public get avatar(): string {
    return this.user.avatar;
  }
  public set externalId(externalId: number) {
    this.user.external_id = externalId;
  }
  public get externalId(): number {
    return this.user.external_id;
  }

  public get createdAt(): Date {
    return this.user.created_at;
  }

  public createUser() {
    this.user.created_at = new Date();
  }
}
