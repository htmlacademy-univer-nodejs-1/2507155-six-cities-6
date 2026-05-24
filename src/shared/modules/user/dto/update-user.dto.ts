import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatar?: string;
  public type?: UserType; // TODO пока не понятно, как работать с типом пользователя (как он изменяется? при каких условиях?)
  public password?: string;
}
