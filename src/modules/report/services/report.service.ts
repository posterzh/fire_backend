import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IQuestion, IReport, ISection } from "../interfaces/report.interface";
import { StrToUnix } from "src/utils/StringManipulation";
import { CreateReportDTO } from "../dto/report.dto";
import { IInspection } from "../../inspection/interfaces/inspection.interface";
import { ITemplate } from "../../template/interfaces/template.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class ReportService {

  constructor(
    @InjectModel("Inspection") private readonly inspectionModel: Model<IInspection>,
    @InjectModel("Template") private readonly templateModel: Model<ITemplate>,
    @InjectModel("Report") private readonly reportModel: Model<IReport>,
    @InjectModel("Section") private readonly sectionModel: Model<ISection>,
    @InjectModel("Question") private readonly questionModel: Model<IQuestion>,
  ) {
  }

  async create(createReportDto: CreateReportDTO): Promise<IReport> {
    const inspection = await this.inspectionModel.findOne({
      slug: createReportDto.inspection_slug
    }).populate('template')

    if (!inspection) {
      throw new NotFoundException(`Inspection with slug ${createReportDto.inspection_slug}`)
    }

    const newReport = new this.reportModel(createReportDto);
    newReport.inspection = inspection;

    // Copy template to report
    const template = inspection.template as ITemplate;
    newReport.sections = template.sections;

    await newReport.save();
    return await this.reportModel.findById(newReport._id).exec();
  }

  async findAll(): Promise<IReport[]> {
    return this.reportModel.find({});
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
    }

    try {
      return await this.reportModel.insertMany(found);
    } catch (e) {
      throw new NotImplementedException(`error when insert`);
    }
  }
}
