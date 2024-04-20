import { RolesRepository, UserRepository } from '../../repository';
import { PermissionsRepository } from '../../repository/permissions/PermissionsRepository';
import { UserAccessControlRepository } from '../../repository/userAccessControl/UserAccessControlRepository';


type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export class UserAccessControlService {
  constructor(private userRepository: UserRepository,
    private userAccessControlRepository: UserAccessControlRepository,
  ) { }

  async create(userACLRequest: UserACLRequest) {

    const user = await this.userRepository.findById(userACLRequest.userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userAccessControlRepository.addRolesToUser(user.id, userACLRequest.roles);

    await this.userAccessControlRepository.addPermissionsToUser(user.id, userACLRequest.permissions);

    return user;


  }

}