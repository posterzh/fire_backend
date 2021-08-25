import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { QuestionSchema, SectionSchema, ReportSchema } from "./schemas/report.schema";

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Question', schema: QuestionSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'Report', schema: ReportSchema },
    ]),
    AuthModule,
	],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [MongooseModule, ReportService]
})
export class ReportModule {}
