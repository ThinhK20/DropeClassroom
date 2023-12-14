import { BaseRepositoryInterface } from './base.interface.repository';
import { Model } from 'mongoose';

export abstract class BaseRepositoryAbstract<T>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(dto: T | any): Promise<any> {
    const created_data = await this.model.create(dto);
    return created_data.save();
  }
}
