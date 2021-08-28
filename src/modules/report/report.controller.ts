import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { ReportService } from "./report.service";
import { ArrayIdDTO, CreateReportDTO, UpdateReportDTO } from "./dto/report.dto";

@ApiTags("Reports")
@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) { }

	@Get()
	@ApiOperation({ summary: 'Get all report' })

	@ApiQuery({
		name: 'inspection_slug',
		required: false,
		type: String,
		example: 'fire-alarm-inspection'
	})

	async findAll(@Req() req, @Res() res) {

		const report = await this.reportService.findAll(req.query.inspection_slug);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get reports`,
			total: report.length,
			data: report
		});
	}


	@Post()
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Create new report' })

	async create(@Res() res, @Body() createReportDto: CreateReportDTO) {
		const report = await this.reportService.create(createReportDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Report has been successfully created.',
			data: report
		});
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get report by id' })

	@ApiParam({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		example: '6128db87542e9d507ce92686',
		description: 'Report ID'
	})

	async findById(@Param('id') id: string, @Res() res)  {
		const report = await this.reportService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get report by id ${id}`,
			data: report
		});
	}

	@Put(':id')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Update report by id' })

	@ApiParam({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		example: '6128db87542e9d507ce92686',
		description: 'Report ID'
	})

	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateReportDto: UpdateReportDTO
	) {
		const report = await this.reportService.update(id, updateReportDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Report has been successfully updated.',
			data: report
		});
	}

	@Delete(':id')
	@UseGuards(JwtGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Delete report' })

	@ApiParam({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		example: '6128db87542e9d507ce92686',
		description: 'Report ID'
	})

	async delete(@Param('id') id: string, @Res() res){
		const report = await this.reportService.delete(id);

		if (report == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove report by id ${id}`
			});
		}
	}

	@Delete('delete/multiple')
	@UseGuards(JwtGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Delete multiple report' })

	async deleteMany(@Res() res, @Body() arrayId: ArrayIdDTO) {
		const report = await this.reportService.deleteMany(arrayId.id);
		if (report == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove report by id in: [${arrayId.id}]`
			});
		}
	}

	@Post('multiple/clone')
	@UseGuards(JwtGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Clone reports' })

	async clone(@Res() res, @Body() input: ArrayIdDTO) {

		const cloning = await this.reportService.insertMany(input)

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'Has been successfully cloned the report.',
			data: cloning
		});
	}
}
