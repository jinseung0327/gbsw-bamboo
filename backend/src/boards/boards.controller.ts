import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, ReportCount } from './dto/create.board.dto';
import { Param } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard() {
    return this.boardService.getAllBoards();
  }

  @Get('/page/:page')
  getBoardByPage(@Param('page') page: number) {
    return this.boardService.getBoardByPage(page);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardId(@Param('id') id: number) {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number) {
    this.boardService.deleteBoard(id);
  }

  @Post(':id/report')
  async reportBoard(@Param('id') id: number, @Body() ReportCount: ReportCount) {
    await this.boardService.reportBoard(id, ReportCount);
  }
}
