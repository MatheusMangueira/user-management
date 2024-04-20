import { RolesDTO } from '../roles/RolesDTO';


export class UserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  company_id: string;
  roles: RolesDTO[];
  createdAt: Date;
}