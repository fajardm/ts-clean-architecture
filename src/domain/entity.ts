export abstract class Entity {
  id!: string;
  createdBy!: string;
  createdAt!: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
