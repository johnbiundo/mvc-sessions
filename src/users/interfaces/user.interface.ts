export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export interface User {
  id: number;
  username: string;
  password: string;
  roles: UserRole[];
}
