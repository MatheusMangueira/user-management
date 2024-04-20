import { UserDTO } from '../../../DTOs/user/UserDTO';
import { UserModel } from '../../../model';

export interface IUserRepository {
  create(user: UserDTO): Promise<UserDTO>;
  getAll(): Promise<UserDTO[]>;
  findById(id: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  // update(user: any): Promise<any | null>;
  // delete(id: string): Promise<boolean>;
}