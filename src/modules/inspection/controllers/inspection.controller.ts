import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";

import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

import { InspectionService } from "../services/inspection.service";

@ApiTags("Inspections")
@Controller('inspections')
export class InspectionController {
	constructor(private readonly inspectionService: InspectionService) { }

	@Get()
	@ApiOperation({ summary: 'Get all inspection' })

	@ApiQuery({
		name: 'category_slug',
		required: false,
		type: String,
		example: 'fire-alarm-system-inspection'
	})
	async findAll(@Req() req, @Res() res) {

		const inspection = await this.inspectionService.findAll(req.query.category_slug);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get inspections`,
			total: inspection.length,
			data: inspection
		});
	}
}
