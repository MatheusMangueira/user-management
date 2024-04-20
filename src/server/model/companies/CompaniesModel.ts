import { v4 as uuidv4 } from 'uuid';


export class CompaniesModel {

  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;


  constructor(name: string, email: string, password: string, createdAt: Date, role: string) {
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.password = password;
    this.role = role;

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}