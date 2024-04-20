import { v4 as uuidv4 } from 'uuid';
import { RolesDTO } from '../../DTOs/roles/RolesDTO';


export class UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  company_id: string;
  roles: RolesDTO[];
  created_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    company_id: string,
    roles: RolesDTO[],
    created_at: Date) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.company_id = company_id;
    this.created_at = created_at;
    this.roles = roles;

    if (!this.id) {
      this.id = uuidv4();
    }

  }




}