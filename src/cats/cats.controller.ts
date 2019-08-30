import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CatsService } from './cats.service';
import { CatCreateSchema } from './schemas/cat.create.schema';
import { Cat } from './interfaces/cat.interface';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { CatsEntity } from './cats.entity';

@Controller('cats')
@UseGuards(AuthenticatedGuard)
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Post('/')
  @Roles('admin')
  async create(@Body() body: CatCreateSchema): Promise<CatsEntity> {
    return this.catsService.create(body);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // logic
  }
}
