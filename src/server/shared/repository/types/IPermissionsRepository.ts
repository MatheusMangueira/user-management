import { PermissionsModel } from '../../../model/permissions/PermissionsModel';

export interface IPermissionsRepository {
  create(permission: PermissionsModel): Promise<PermissionsModel>;
  getAll(): Promise<PermissionsModel[]>;
  findByName(name: string): Promise<PermissionsModel | null>;

}