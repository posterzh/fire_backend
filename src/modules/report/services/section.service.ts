import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IReport, ISection } from "../interfaces/report.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class SectionService {

  constructor(
    @InjectModel("Report") private readonly reportModel: Model<IReport>,
    @InjectModel("Section") private readonly sectionModel: Model<ISection>,
  ) {
  }

  async update(report_id: string, section_index: number, updateReportDto: any): Promise<IReport> {
    let result;

    // Check ID
    try {
      // result = await this.reportModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could nod find report with id ${section_index}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find report with id ${section_index}`);
    }

    try {
      await this.reportModel.findByIdAndUpdate(section_index, updateReportDto);
      return await this.reportModel.findById(section_index).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(report_id: string, section_index: number): Promise<string> {
    try {
      await this.reportModel.findByIdAndRemove(report_id).exec();
      return "ok";
    } catch (err) {
      throw new NotImplementedException("The report could not be deleted");
    }
  }

  async duplicate(report_id: string, section_index: number): Promise<IReport> {
    let result;

    // Check ID
    try {
      result = await this.reportModel.findById(report_id);
    } catch (error) {
      throw new NotFoundException(`Could nod find report with id ${report_id}`);
    }

    if (!result) {
      throw new NotFoundException(`Could nod find report with id ${report_id}`);
    }

    try {
      // await this.reportModel.findByIdAndUpdate(id, updateReportDto);
      return await this.reportModel.findById(report_id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
}
