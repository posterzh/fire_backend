import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IQuestion, IReport, ISection } from "../interfaces/report.interface";
import * as _ from 'lodash';
const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class QuestionService {

  constructor(
    @InjectModel("Report") private readonly reportModel: Model<IReport>,
    @InjectModel("Section") private readonly sectionModel: Model<ISection>,
    @InjectModel("Question") private readonly questionModel: Model<IQuestion>,
  ) {
  }

  async update(report_id: string, section_index: number, question_index: number, updateQuestionDto: any): Promise<IReport> {
    try {
      const report = await this.reportModel.findById(report_id);
      const question = report.sections[section_index].questions[question_index];
      report.sections[section_index].questions[question_index] = _.merge(question, updateQuestionDto)
      await report.save();

      return await this.reportModel.findById(report_id).exec();
    } catch (error) {
      throw new NotFoundException(`Could nod find`);
    }
  }
}
