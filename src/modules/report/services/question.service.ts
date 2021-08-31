import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IQuestion, IReport, ISection } from "../interfaces/report.interface";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class QuestionService {

  constructor(
    @InjectModel("Report") private readonly reportModel: Model<IReport>,
    @InjectModel("Section") private readonly sectionModel: Model<ISection>,
    @InjectModel("Question") private readonly questionModel: Model<IQuestion>,
  ) {
  }

  async update(report_id: string, section_index: number, question_index: number, updateReportDto: any): Promise<IReport> {
    try {
      const report = await this.reportModel.findById(report_id);
      // report?.sections[section_index]?.questions[question_index]
    } catch (error) {
      throw new NotFoundException(`Could nod find report with id ${report_id}`);
    }


    try {

      // await this.reportModel.findByIdAndUpdate(report_id, updateReportDto);
      return await this.reportModel.findById(report_id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
}
