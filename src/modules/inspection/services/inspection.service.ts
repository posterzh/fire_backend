import {
  Injectable,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { IInspection } from "../interfaces/inspection.interface";
import { OptQuery } from "src/utils/OptQuery";
import { StrToUnix } from "src/utils/StringManipulation";
import { ICategory } from "../interfaces/category.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class InspectionService {

  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<ICategory>,
    @InjectModel("Inspection") private readonly inspectionModel: Model<IInspection>,
  ) {
  }

  async findAll(category_slug): Promise<IInspection[]> {

    if (category_slug) {
      const category = await this.categoryModel.findOne({
        slug: category_slug
      })

      if (!category) {
        throw new NotFoundException(`Category with slug ${category_slug}`)
      }

      return this.inspectionModel.find({category: category._id});
    }

    return this.inspectionModel.find({});
  }
}
