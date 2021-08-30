import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { QuestionSchema, SectionSchema, ReportSchema } from "./schemas/report.schema";
import { InspectionSchema } from "../inspection/schemas/inspection.schema";
import { TemplateSchema } from "../template/schemas/template.schema";

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
  controllers: [ReportController],
  providers: [ReportService],
  exports: [MongooseModule, ReportService]
})
export class ReportModule {}
