import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ReportService } from "../services/report.service";
import { ArrayIdDTO, CreateReportDTO, UpdateReportDTO } from "../dto/report.dto";

@ApiTags("Reports")
@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) { }

	@Get()
	@ApiOperation({ summary: 'Get all report' })
	async findAll(@Req() req, @Res() res) {

		const report = await this.reportService.findAll();
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

	@Get(':report_id')
	@ApiOperation({ summary: 'Get report by id' })

	@ApiParam({
		name: 'report_id',
		required: true,
		explode: true,
		type: String,
		example: '712caa4eb53e60dddae40001',
		description: 'Report ID'
	})

	async findById(@Param('report_id') report_id: string, @Res() res)  {
		const report = await this.reportService.findById(report_id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get report by id ${report_id}`,
			data: report
		});
	}

	@Put(':report_id')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Update report by id' })

	@ApiParam({
		name: 'report_id',
		required: true,
		explode: true,
		type: String,
		example: '712caa4eb53e60dddae40001',
		description: 'Report ID'
	})

	async update(
		@Param('report_id') report_id: string,
		@Res() res,
		@Body() updateReportDto: UpdateReportDTO
	) {
		const report = await this.reportService.update(report_id, updateReportDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Report has been successfully updated.',
			data: report
		});
	}

	@Delete(':report_id')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Delete report by id' })

	@ApiParam({
		name: 'report_id',
		required: true,
		explode: true,
		type: String,
		example: '712caa4eb53e60dddae40001',
		description: 'Report ID'
	})

	async delete(@Param('report_id') report_id: string, @Res() res){
		const report = await this.reportService.delete(report_id);

		if (report == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove report by id ${report_id}`
			});
		}
	}

	@Delete('delete/multiple')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
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
}
