import {
  Injectable,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { IReport } from "./interfaces/report.interface";
import { OptQuery } from "src/utils/OptQuery";
import { StrToUnix } from "src/utils/StringManipulation";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class ReportService {

  constructor(
    @InjectModel("Report") private readonly reportModel: Model<IReport>,
  ) {
  }

  async create(createReportDto: any): Promise<IReport> {
    const createReport = new this.reportModel(createReportDto);

    // Check if report name is already exist
    const isReportNameExist = await this.reportModel.findOne({ name: createReport.name });

    if (isReportNameExist) {
      throw new BadRequestException("That report name (slug) is already exist.");
    }

    return await createReport.save();
  }

  async findAll(options: OptQuery): Promise<IReport[]> {
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

    query = await this.reportModel.find(match).skip(skip).limit(limit).sort(sort).populate("rating", ["rate"]);
    return query;
  }

  async findById(id: string): Promise<IReport> {
    let result;
    try {
      result = await this.reportModel.findById(id).populate("rating");
    } catch (error) {
      throw new NotFoundException(`Could nod find report with id ${id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find report with id ${id}`);
    }

    return result;
  }

  async update(id: string, updateReportDto: any): Promise<IReport> {
    let result;

    // Check ID
    try {
      result = await this.reportModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could nod find report with id ${id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find report with id ${id}`);
    }

    try {
      await this.reportModel.findByIdAndUpdate(id, updateReportDto);
      return await this.reportModel.findById(id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      await this.reportModel.findByIdAndRemove(id).exec();
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The report could not be deleted");
    }
  }

  async deleteMany(arrayId: any): Promise<string> {
    try {
      await this.reportModel.deleteMany({ _id: { $in: arrayId } });
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The report could not be deleted");
    }
  }

  async search(value: any): Promise<IReport[]> {
    const result = await this.reportModel.find({
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

    var found = await this.reportModel.find({ _id: { $in: arrayId } });
    for (let i in found) {
      found[i]._id = new ObjectId();
      found[i].name = `${found[i].name}-${copy}`;
      found[i].slug = `${found[i].slug}-${copy}`;
    }

    try {
      return await this.reportModel.insertMany(found);
    } catch (e) {
      throw new NotImplementedException(`error when insert`);
    }
  }
}
