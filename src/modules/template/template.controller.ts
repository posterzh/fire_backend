import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

import { JwtGuard } from "../auth/guards/jwt.guard";

import { TemplateService } from "./template.service";
import { CreateTemplateDTO, UpdateTemplateDTO } from "./dto/template.dto";

@ApiTags("Templates")
@Controller('templates')
export class TemplateController {
	constructor(private readonly templateService: TemplateService) { }

	@Get()
	@ApiOperation({ summary: 'Get all template' })

	@ApiQuery({
		name: 'inspection',
		required: false,
		type: String,
		example: 'fire-alarm-inspection'
	})

	async findAll(@Req() req, @Res() res) {

		const template = await this.templateService.findAll(req.query);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get templates`,
			total: template.length,
			data: template
		});
	}
}
