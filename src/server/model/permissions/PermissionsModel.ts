import { v4 as uuidv4 } from 'uuid';


export class PermissionsModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor(name: string, description: string, createdAt: Date,) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}