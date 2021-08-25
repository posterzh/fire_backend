import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { InspectionSchema } from './schemas/inspection.schema';

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Inspection', schema: InspectionSchema }
    ]),
    AuthModule,
	],
  controllers: [InspectionController],
  providers: [InspectionService],
  exports: [MongooseModule, InspectionService]
})
export class InspectionModule {}
