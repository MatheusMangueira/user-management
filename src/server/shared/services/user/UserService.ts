import { UserDTO } from '../../../DTOs/user/UserDTO';
import { UserModel } from '../../../model';
import { ICompaniesRepository } from '../../repository/types/IComponiesRepository';
import { IRolesRepository } from '../../repository/types/IRolesRepository';
import { IUserRepository } from '../../repository/types/IUserRepository';
import { hash } from 'bcryptjs';



export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private companiesRepository: ICompaniesRepository,
    private rolesRepository: IRolesRepository,
  ) { }

  async create(userDto: UserDTO) {

    try {

      const company = await this.companiesRepository.findById(userDto.company_id);
      const emailUser = await this.userRepository.findByEmail(userDto.email);

      if (!company?.id) {
        throw new Error('id company not exists');
      }

      if (emailUser?.email === userDto.email) {
        throw new Error('email in user already exists');
      }

      const passwordHash = await hash(userDto.password, 8);

      const newUser = new UserModel(
        userDto.name,
        userDto.email,
        passwordHash,
        company.id,
        userDto.roles,
        new Date()
      );

      const createdUser = await this.userRepository.create(newUser);

      return createdUser;

    } catch (err) {
      console.log(err, 'error in service');
      throw new Error('Error in create user');
    }
  }

  async getAll() {
    try {
      const users = this.userRepository.getAll();
      return users;
    } catch (err) {
      console.log(err, 'error in service');
      throw new Error('Error in get all users');
    }
  }



}