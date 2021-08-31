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
    try {
      const report = await this.reportModel.findById(report_id);
      report.sections[section_index].name = updateReportDto.name;
      await report.save();

      return await this.reportModel.findById(report_id).exec();
    } catch (error) {
      throw new NotFoundException(`Could nod find`);
    }
  }

  async delete(report_id: string, section_index: number): Promise<IReport> {
    try {
      const report = await this.reportModel.findById(report_id);
      report.sections.splice(section_index, 1);
      await report.save();

      return await this.reportModel.findById(report_id).exec();
    } catch (error) {
      throw new NotFoundException(`Could nod find`);
    }
  }

  async duplicate(report_id: string, section_index: number): Promise<IReport> {
    try {
      const report = await this.reportModel.findById(report_id);
      const section = report.sections[section_index];
      report.sections.splice(section_index + 1, 0, section);
      await report.save();

      return await this.reportModel.findById(report_id).exec();
    } catch (error) {
      throw new NotFoundException(`Could nod find`);
    }
  }
}
