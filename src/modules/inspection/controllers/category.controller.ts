import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";

import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "../services/category.service";

@ApiTags("Inspections")
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@Get()
	@ApiOperation({ summary: 'Get all categories' })
	async findAll(@Req() req, @Res() res) {

		const categories = await this.categoryService.findAll();
		return res.status(HttpStatus.OK).json({
			statusCode: HttpStatus.OK,
			message: `Success get categories`,
			total: categories.length,
			data: categories
		});
	}
}
