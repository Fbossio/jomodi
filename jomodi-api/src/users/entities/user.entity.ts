export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
