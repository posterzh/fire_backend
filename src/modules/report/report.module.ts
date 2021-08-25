import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportSchema } from './schemas/report.schema';

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Report', schema: ReportSchema }
    ]),
    AuthModule,
	],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [MongooseModule, ReportService]
})
export class ReportModule {}
