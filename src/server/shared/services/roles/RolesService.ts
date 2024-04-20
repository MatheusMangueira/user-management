import { RolesDTO } from '../../../DTOs/roles/RolesDTO';
import { RolesModel } from '../../../model/roles/RolesModel';
import { RolesRepository } from '../../repository';


export class RolesService {
  constructor(private rolesRepository: RolesRepository) { }

  async create(role: RolesDTO) {

    try {
      const nameRole = await this.rolesRepository.findByName(role.name);

      if (nameRole?.name === role.name) {
        throw new Error('name in role already exists');
      }

      const newRole = new RolesModel(
        role.name,
        role.description,
        new Date(),
        []
      );

      const createdRole = await this.rolesRepository.create(newRole);

      return createdRole;
    } catch (err) {
      throw new Error('Error in create role');
    }
  }

  async getAll() {
    try {
      const roles = this.rolesRepository.getAll();
      return roles;
    } catch (err) {
      throw new Error('Error in get all roles');
    }
  }

}