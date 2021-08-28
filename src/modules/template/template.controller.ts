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


	@Post()
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Create new template' })

	async create(@Res() res, @Body() createTemplateDto: CreateTemplateDTO) {
		const template = await this.templateService.create(createTemplateDto);

		return res.status(HttpStatus.CREATED).json({
			statusCode: HttpStatus.CREATED,
			message: 'The Template has been successfully created.',
			data: template
		});
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get template by id' })

	@ApiParam({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		example: '6127dab1d55c1d9a267b6001',
		description: 'Template ID'
	})

	async findById(@Param('id') id: string, @Res() res)  {
		const template = await this.templateService.findById(id);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get template by id ${id}`,
			data: template
		});
	}

	@Put(':id')
	@UseGuards(JwtGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Update template by id' })

	@ApiParam({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		example: '6127dab1d55c1d9a267b6001',
		description: 'Template ID'
	})

	async update(
		@Param('id') id: string,
		@Res() res,
		@Body() updateTemplateDto: UpdateTemplateDTO
	) {
		const template = await this.templateService.update(id, updateTemplateDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Template has been successfully updated.',
			data: template
		});
	}

	@Delete(':id')
	@UseGuards(JwtGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Delete template' })

	@ApiParam({
		name: 'id',
		required: true,
		explode: true,
		type: String,
		example: '6127dab1d55c1d9a267b6001',
		description: 'Template ID'
	})

	async delete(@Param('id') id: string, @Res() res){
		const template = await this.templateService.delete(id);

		if (template == 'ok') {
			return res.status(HttpStatus.OK).json({
				statusCode: HttpStatus.OK,
				message: `Success remove template by id ${id}`
			});
		}
	}
}
