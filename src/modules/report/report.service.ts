import {
  Injectable,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { IQuestion, IReport, ISection } from "./interfaces/report.interface";
import { OptQuery } from "src/utils/OptQuery";
import { StrToUnix } from "src/utils/StringManipulation";
import { CreateReportDTO } from "./dto/report.dto";
import { IInspection } from "../inspection/interfaces/inspection.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class ReportService {

  constructor(
    @InjectModel("Inspection") private readonly inspectionModel: Model<IInspection>,
    @InjectModel("Report") private readonly reportModel: Model<IReport>,
    @InjectModel("Section") private readonly sectionModel: Model<ISection>,
    @InjectModel("Question") private readonly questionModel: Model<IQuestion>,
  ) {
  }

  async create(createReportDto: CreateReportDTO): Promise<IReport> {
    const inspection = await this.inspectionModel.findOne({
      slug: createReportDto.inspection_slug
    })

    if (!inspection) {
      throw new NotFoundException(`Inspection with slug ${createReportDto.inspection_slug}`)
    }

    const newReport = new this.reportModel(createReportDto);
    inspection.reports.unshift(newReport);
    inspection.save();

    return await newReport.save();
  }

  async findAll(inspection_slug): Promise<IReport[]> {
    if (inspection_slug) {
      const inspection = await this.inspectionModel.findOne({
        slug: inspection_slug
      }).populate('reports');

      if (!inspection) {
        throw new NotFoundException(`Inspection with slug ${inspection_slug}`)
      }

      return inspection.reports;
    }

    return await this.reportModel.find({})
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
