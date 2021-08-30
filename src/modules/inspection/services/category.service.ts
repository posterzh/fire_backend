import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<ICategory>,
  ) {
  }

  async findAll(): Promise<ICategory[]> {
    return await this.categoryModel.find({});
  }
}
