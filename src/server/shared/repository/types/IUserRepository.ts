import { UserDTO } from '../../../DTOs/user/UserDTO';
import { UserModel } from '../../../model';

export interface IUserRepository {
  create(user: UserModel): Promise<UserModel>;
  getAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  // update(user: any): Promise<any | null>;
  // delete(id: string): Promise<boolean>;
}