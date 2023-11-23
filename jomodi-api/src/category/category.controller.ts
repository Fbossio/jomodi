import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedCategory = await this.categoryService.remove(id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Category deleted', deletedCategory });
    } catch (error) {
      if (error.message === 'Category has products') {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Category has products' });
      }

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
}
