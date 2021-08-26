import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { InspectionSchema } from './schemas/inspection.schema';
import { ReportSchema, TemplateSchema } from "../report/schemas/report.schema";

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Inspection', schema: InspectionSchema },
      // { name: 'Report', schema: ReportSchema },
      // { name: 'Template', schema: TemplateSchema },
    ]),
    AuthModule,
	],
  controllers: [InspectionController],
  providers: [InspectionService],
  exports: [MongooseModule, InspectionService]
})
export class InspectionModule {}
