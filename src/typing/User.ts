export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export type UserName = Pick<User, 'displayName'>;
