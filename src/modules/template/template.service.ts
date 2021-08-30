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
}
