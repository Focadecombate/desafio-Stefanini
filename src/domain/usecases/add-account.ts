import { AccountModel } from '../models/account';

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
  age: number;
  role?: string;
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
