import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { InspectionSchema } from "../inspection/schemas/inspection.schema";
import { TemplateSchema } from "./schemas/template.schema";
import { QuestionSchema, SectionSchema } from "../report/schemas/report.schema";

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Inspection', schema: InspectionSchema },
      { name: 'Template', schema: TemplateSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'Question', schema: QuestionSchema },
    ]),
    AuthModule,
	],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [MongooseModule, TemplateService]
})
export class TemplateModule {}
