import { v4 as uuidv4 } from 'uuid';
import { PermissionsDTO } from '../../DTOs/permissions/PermissionsDTO';
import { RolesDTO } from '../../DTOs/roles/RolesDTO';
import { PermissionsModel } from '../permissions/PermissionsModel';
import { RolesModel } from '../roles/RolesModel';


export class UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  company_id: string;
  permissions: PermissionsModel[];
  roles: RolesModel[];
  createdAt: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    company_id: string,
    permissions: PermissionsModel[],
    roles: RolesModel[],
    createdAt: Date) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.company_id = company_id;
    this.createdAt = createdAt;
    this.permissions = permissions;
    this.roles = roles;

    if (!this.id) {
      this.id = uuidv4();
    }

  }




}