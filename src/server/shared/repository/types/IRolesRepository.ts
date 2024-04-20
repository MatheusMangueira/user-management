import { RolesModel } from '../../../model/roles/RolesModel';



export interface IRolesRepository {
  create(role: RolesModel): Promise<RolesModel>;
  getAll(): Promise<RolesModel[]>;
  // findById(id: string): Promise<RolesModel | null>;
  findByName(name: string): Promise<RolesModel | null>;
  // update(role: any): Promise<any | null>;
  // delete(id: string): Promise<boolean>;
}