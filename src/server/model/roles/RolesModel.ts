import { v4 as uuidv4 } from 'uuid';
import { PermissionsModel } from '../permissions/PermissionsModel';


export class RolesModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  permissions: PermissionsModel[];

  constructor(
    name: string,
    description: string,
    createdAt: Date,
    permissions: PermissionsModel[]) {

    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.permissions = permissions;

    if (!this.id) {
      this.id = uuidv4();
    }

  }

}