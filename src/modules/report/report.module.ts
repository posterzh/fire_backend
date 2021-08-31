import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { QuestionSchema, SectionSchema, ReportSchema } from "./schemas/report.schema";
import { InspectionSchema } from "../inspection/schemas/inspection.schema";
import { TemplateSchema } from "../template/schemas/template.schema";
import { QuestionService } from "./services/question.service";
import { SectionService } from "./services/section.service";
import { SectionController } from "./controllers/section.controller";
import { QuestionController } from "./controllers/question.controller";

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Inspection', schema: InspectionSchema },
      { name: 'Template', schema: TemplateSchema },
      { name: 'Report', schema: ReportSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'Question', schema: QuestionSchema },
    ]),
    AuthModule,
	],
  controllers: [ReportController, SectionController, QuestionController],
  providers: [ReportService, SectionService, QuestionService],
  exports: [MongooseModule, ReportService]
})
export class ReportModule {}
