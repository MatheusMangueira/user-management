import { RolesRepository } from '../../repository';
import { PermissionsRepository } from '../../repository/permissions/PermissionsRepository';


type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};


export class RolePermissionService {
  constructor(private rolesRepository: RolesRepository,
    private permissionsRepository: PermissionsRepository

  ) { }

  async create(rolePermissionRequest: RolePermissionRequest) {

    const role = await this.rolesRepository.findById(rolePermissionRequest.roleId);

    console.log(rolePermissionRequest.permissions, 'rolePermissionRequest.permissions');

    if (!role) {
      throw new Error('Role not found');
    }

    const permissions = await this.permissionsRepository.findByIds(
      rolePermissionRequest.permissions
    );

    if (permissions.length !== rolePermissionRequest.permissions.length) {
      throw new Error('One or more permissions not found');
    }

    await this.rolesRepository.addPermissionsToRole(role.id, rolePermissionRequest.permissions);

    return role;
  }
}