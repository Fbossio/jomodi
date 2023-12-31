import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserRole } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@Serialize(ProductDto)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const savedImage = await this.productsService.uploadImage(
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    createProductDto.imageUrl = savedImage;
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return this.productsService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('category/:categoryId')
  async productsByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.productsByCategory(categoryId);
  }
}
