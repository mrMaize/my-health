export const enum Gender {
  female = 0,
  male = 1,
}

export interface IUser {
  gender?: Gender;
  phone?: string;
  name?: string;
  birthdate?: string;
  email: string;
  cmi?: string; //омс;
  vhi?: string; //дмс;
}
