import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { QuestionService } from "../services/question.service";
import { UpdateQuestionDTO } from "../dto/question.dto";

@ApiTags("Questions")
@Controller('reports/:report_id/sections/:section_index/questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) { }

	@Put(':question_index')
	// @UseGuards(JwtGuard)
	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Update question' })

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

	@ApiParam({
		name: 'question_index',
		required: true,
		explode: true,
		type: Number,
		example: 0,
		description: 'Question Index'
	})

	async update(
		@Param('report_id') report_id: string,
		@Param('section_index') section_index: number,
		@Param('question_index') question_index: number,
		@Res() res,
		@Body() updateQuestionDto: UpdateQuestionDTO
	) {
		const question = await this.questionService.update(report_id, section_index, question_index, updateQuestionDto);
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: 'The Question has been successfully updated.',
			data: question
		});
	}
}
