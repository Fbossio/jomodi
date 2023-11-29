export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
