import {
  Injectable,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { IInspection } from "./interfaces/inspection.interface";
import { OptQuery } from "src/utils/OptQuery";
import { StrToUnix } from "src/utils/StringManipulation";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class InspectionService {

  constructor(
    @InjectModel("Inspection") private readonly inspectionModel: Model<IInspection>,
  ) {
  }

  async create(createInspectionDto: any): Promise<IInspection> {
    const createInspection = new this.inspectionModel(createInspectionDto);

    // Check if inspection name is already exist
    const isInspectionNameExist = await this.inspectionModel.findOne({ name: createInspection.name });

    if (isInspectionNameExist) {
      throw new BadRequestException("That inspection name (slug) is already exist.");
    }

    return await createInspection.save();
  }

  async findAll(options: OptQuery): Promise<IInspection[]> {
    const limit = Number(options.limit);
    const offset = Number(options.offset == 0 ? options.offset : (options.offset - 1));
    const skip = offset * limit;
    const sortval = (options.sortval == "asc") ? 1 : -1;

    var query: any;
    var match: any, sort: any = {};
    if (options.sortby) {

      if (options.fields) {
        match = { $where: `/^${options.value}.*/.test(this.${options.fields})` };
      }

      sort = { [options.sortby]: sortval };
    } else {
      if (options.fields) {
        match = { $where: `/^${options.value}.*/.test(this.${options.fields})` };
      }
      sort = { "updated_at": "desc" };
    }

    query = await this.inspectionModel.find(match).skip(skip).limit(limit).sort(sort).populate("rating", ["rate"]);
    return query;
  }

  async findById(id: string): Promise<IInspection> {
    let result;
    try {
      result = await this.inspectionModel.findById(id).populate("rating");
    } catch (error) {
      throw new NotFoundException(`Could nod find inspection with id ${id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find inspection with id ${id}`);
    }

    return result;
  }

  async update(id: string, updateInspectionDto: any): Promise<IInspection> {
    let result;

    // Check ID
    try {
      result = await this.inspectionModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could nod find inspection with id ${id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find inspection with id ${id}`);
    }

    try {
      await this.inspectionModel.findByIdAndUpdate(id, updateInspectionDto);
      return await this.inspectionModel.findById(id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      await this.inspectionModel.findByIdAndRemove(id).exec();
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The inspection could not be deleted");
    }
  }

  async deleteMany(arrayId: any): Promise<string> {
    try {
      await this.inspectionModel.deleteMany({ _id: { $in: arrayId } });
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The inspection could not be deleted");
    }
  }

  async search(value: any): Promise<IInspection[]> {
    const result = await this.inspectionModel.find({
      "name": { $regex: ".*" + value.search + ".*", $options: "i" },
    });

    if (!result) {
      throw new NotFoundException("Your search was not found");
    }

    return result;
  }

  async insertMany(value: any) {
    const arrayId = value.id;
    const now = new Date();
    const copy = `COPY-${StrToUnix(now)}`;

    var found = await this.inspectionModel.find({ _id: { $in: arrayId } });
    for (let i in found) {
      found[i]._id = new ObjectId();
      found[i].name = `${found[i].name}-${copy}`;
      found[i].slug = `${found[i].slug}-${copy}`;
    }

    try {
      return await this.inspectionModel.insertMany(found);
    } catch (e) {
      throw new NotImplementedException(`error when insert`);
    }
  }
}
