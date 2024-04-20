import { PermissionsDTO } from '../../../DTOs/permissions/PermissionsDTO';
import { PermissionsModel } from '../../../model/permissions/PermissionsModel';
import { PermissionsRepository } from '../../repository/permissions/PermissionsRepository';



export class PermissionsService {
  constructor(private permissionsRepository: PermissionsRepository) { }

  async create(permission: PermissionsDTO) {
    try {
      const namePermission = await this.permissionsRepository.findByName(permission.name);

      if (namePermission?.name === permission.name) {
        throw new Error('name in permission already exists');
      }

      const newPermission = new PermissionsModel(
        permission.name,
        permission.description,
        new Date()
      );

      const createdPermission = await this.permissionsRepository.create(newPermission);

      return createdPermission;

    } catch (err) {
      throw new Error('Error in create permission');
    }
  }

  async getAll() {
    try {
      const permissions = this.permissionsRepository.getAll();
      return permissions;
    } catch (err) {
      throw new Error('Error in get all permissions');
    }
  }
}