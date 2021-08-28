import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { InspectionController } from './controllers/inspection.controller';
import { InspectionService } from './services/inspection.service';
import { InspectionSchema } from './schemas/inspection.schema';
import { CategoryController } from "./controllers/category.controller";
import { CategoryService } from "./services/category.service";
import { CategorySchema } from "./schemas/category.schema";

@Module({
  imports: [
		MongooseModule.forFeature([
      { name: 'Inspection', schema: InspectionSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
    AuthModule,
	],
  controllers: [InspectionController, CategoryController],
  providers: [CategoryService, InspectionService],
  exports: [MongooseModule, InspectionService]
})
export class InspectionModule {}
