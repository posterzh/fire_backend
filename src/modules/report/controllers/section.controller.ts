import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UpdateReportDTO } from "../dto/report.dto";
import { SectionService } from "../services/section.service";
import { UpdateSectionDTO } from "../dto/section.dto";

@ApiTags("Sections")
@Controller('reports/:report_id/sections')
export class SectionController {
	constructor(private readonly sectionService: SectionService) { }

	@Put(':section_index')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Update section' })

	@ApiParam({
		name: 'report_id',
		required: true,
		explode: true,
		type: String,
		example: '712caa4eb53e60dddae40001',
		description: 'Report ID'
	})

	@ApiParam({
		name: 'section_index',
		required: true,
		explode: true,
		type: Number,
		example: 0,
		description: 'Section Index'
	})

	async update(
		@Param('report_id') report_id: string,
		@Param('section_index') section_index: number,
		@Res() res,
		@Body() updateSectionDto: UpdateSectionDTO
	) {
		const section = await this.sectionService.update(report_id, section_index, updateSectionDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Section has been successfully updated.',
			data: section
		});
	}

	@Delete(':section_index')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Delete section' })

	@ApiParam({
		name: 'report_id',
		required: true,
		explode: true,
		type: String,
		example: '712caa4eb53e60dddae40001',
		description: 'Report ID'
	})

	@ApiParam({
		name: 'section_index',
		required: true,
		explode: true,
		type: Number,
		example: 0,
		description: 'Section Index'
	})

	async delete(
		@Param('report_id') report_id: string,
		@Param('section_index') section_index: number,
		@Res() res
	){
		const report = await this.sectionService.delete(report_id, section_index);

		if (report == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove section by id ${section_index}`
			});
		}
	}

	@Post(':section_index/duplicate')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Duplicate section' })

	@ApiParam({
		name: 'report_id',
		required: true,
		explode: true,
		type: String,
		example: '712caa4eb53e60dddae40001',
		description: 'Report ID'
	})

	@ApiParam({
		name: 'section_index',
		required: true,
		explode: true,
		type: Number,
		example: 0,
		description: 'Section Index'
	})

	async clone(
		@Param('report_id') report_id: string,
		@Param('section_index') section_index: number,
		@Res() res
	) {
		const section = await this.sectionService.duplicate(report_id, section_index);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Section has been successfully duplicated.',
			data: section
		});
	}
}
