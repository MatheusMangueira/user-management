import { v4 as uuidv4 } from 'uuid';


export class CompaniesModel {

  id: string;
  name: string;
  email: string;
  createdAt: Date;


  constructor(name: string, email: string, createdAt: Date) {
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}