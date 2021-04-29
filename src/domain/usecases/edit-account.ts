import { AccountModel } from '../models/account';

export interface EditAccountModel {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirmation?: string;
  age?: number;
}

export interface EditAccount {
  edit(
    accountId: string,
    editAccountModel: EditAccountModel,
  ): Promise<AccountModel>;
}
