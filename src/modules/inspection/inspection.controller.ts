import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

import { JwtGuard } from "../auth/guards/jwt.guard";

import { InspectionService } from "./inspection.service";
import { ArrayIdDTO, CreateInspectionDTO, InspectionCategory, UpdateInspectionDTO } from "./dto/inspection.dto";

@ApiTags("Inspections")
@Controller('inspections')
export class InspectionController {
	constructor(private readonly inspectionService: InspectionService) { }

	@Get()
	@ApiOperation({ summary: 'Get all inspection' })

	// Swagger Parameter [optional]
	@ApiQuery({
		name: 'category',
		required: false,
		enum: InspectionCategory
	})

	async findAll(@Req() req, @Res() res) {

		const inspection = await this.inspectionService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get inspections`,
			total: inspection.length,
			data: inspection
		});
	}

	// Disable the following APIs that won't be needed in normal case
	// @Post()
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	// @ApiOperation({ summary: 'Create new inspection' })
	//
	// async create(@Res() res, @Body() createInspectionDto: CreateInspectionDTO) {
	// 	const inspection = await this.inspectionService.create(createInspectionDto);
	//
	// 	return res.status(HttpStatus.CREATED).json({
	// 		statusCode: HttpStatus.CREATED,
	// 		message: 'The Inspection has been successfully created.',
	// 		data: inspection
	// 	});
	// }
	//
	// @Get(':id')
	// @ApiOperation({ summary: 'Get inspection by id' })
	//
	// @ApiParam({
	// 	name: 'id',
	// 	required: true,
	// 	explode: true,
	// 	type: String,
	// 	example: '5fb636b3f5cdfe00749e0b05',
	// 	description: 'Inspection ID'
	// })
	//
	// async findById(@Param('id') id: string, @Res() res)  {
	// 	const inspection = await this.inspectionService.findById(id);
	// 	return res.status(HttpStatus.OK).json({
	// 		statusCode: HttpStatus.OK,
	// 		message: `Success get inspection by id ${id}`,
	// 		data: inspection
	// 	});
	// }
	//
	// @Put(':id')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	// @ApiOperation({ summary: 'Update inspection by id' })
	//
	// @ApiParam({
	// 	name: 'id',
	// 	required: true,
	// 	explode: true,
	// 	type: String,
	// 	example: '5fb636b3f5cdfe00749e0b05',
	// 	description: 'Inspection ID'
	// })
	//
	// async update(
	// 	@Param('id') id: string,
	// 	@Res() res,
	// 	@Body() updateInspectionDto: UpdateInspectionDTO
	// ) {
	// 	const inspection = await this.inspectionService.update(id, updateInspectionDto);
	// 	return res.status(HttpStatus.OK).json({
	// 		statusCode: HttpStatus.OK,
	// 		message: 'The Inspection has been successfully updated.',
	// 		data: inspection
	// 	});
	// }
	//
	// @Delete(':id')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	// @ApiOperation({ summary: 'Delete inspection' })
	//
	// @ApiParam({
	// 	name: 'id',
	// 	required: true,
	// 	explode: true,
	// 	type: String,
	// 	example: '5fb636b3f5cdfe00749e0b05',
	// 	description: 'Inspection ID'
	// })
	//
	// async delete(@Param('id') id: string, @Res() res){
	// 	const inspection = await this.inspectionService.delete(id);
	//
	// 	if (inspection == 'ok') {
	// 		return res.status(HttpStatus.OK).json({
	// 			statusCode: HttpStatus.OK,
	// 			message: `Success remove inspection by id ${id}`
	// 		});
	// 	}
	// }
}
