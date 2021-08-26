import {
  Injectable,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { OptQuery } from "src/utils/OptQuery";
import { StrToUnix } from "src/utils/StringManipulation";
import { IInspection } from "../inspection/interfaces/inspection.interface";
import { IQuestion, ISection } from "../report/interfaces/report.interface";
import { CreateTemplateDTO } from "./dto/template.dto";
import { ITemplate } from "./interfaces/template.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class TemplateService {

  constructor(
    @InjectModel("Inspection") private readonly inspectionModel: Model<IInspection>,
    @InjectModel("Template") private readonly templateModel: Model<ITemplate>,
    @InjectModel("Section") private readonly sectionModel: Model<ISection>,
    @InjectModel("Question") private readonly questionModel: Model<IQuestion>,
  ) {
  }

  async create(createTemplateDto: CreateTemplateDTO): Promise<ITemplate> {
    const inspection = await this.inspectionModel.findById(createTemplateDto.inspection_id)

    if (!inspection) {
      throw new NotFoundException(`Inspection with id ${createTemplateDto.inspection_id}`)
    }

    const newTemplate = new this.templateModel(createTemplateDto);
    inspection.template = newTemplate;
    inspection.save();

    return await newTemplate.save();
  }

  async findAll(options: OptQuery): Promise<ITemplate[]> {
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

    query = await this.templateModel.find(match).skip(skip).limit(limit).sort(sort).populate("rating", ["rate"]);
    return query;
  }

  async findById(id: string): Promise<ITemplate> {
    let result;
    try {
      result = await this.templateModel.findById(id).populate("rating");
    } catch (error) {
      throw new NotFoundException(`Could nod find template with id ${id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find template with id ${id}`);
    }

    return result;
  }

  async update(id: string, updateTemplateDto: any): Promise<ITemplate> {
    let result;

    // Check ID
    try {
      result = await this.templateModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could nod find template with id ${id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find template with id ${id}`);
    }

    try {
      await this.templateModel.findByIdAndUpdate(id, updateTemplateDto);
      return await this.templateModel.findById(id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      await this.templateModel.findByIdAndRemove(id).exec();
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The template could not be deleted");
    }
  }

  async deleteMany(arrayId: any): Promise<string> {
    try {
      await this.templateModel.deleteMany({ _id: { $in: arrayId } });
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The template could not be deleted");
    }
  }

  async search(value: any): Promise<ITemplate[]> {
    const result = await this.templateModel.find({
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

    var found = await this.templateModel.find({ _id: { $in: arrayId } });
    for (let i in found) {
      found[i]._id = new ObjectId();
      found[i].name = `${found[i].name}-${copy}`;
    }

    try {
      return await this.templateModel.insertMany(found);
    } catch (e) {
      throw new NotImplementedException(`error when insert`);
    }
  }
}
