import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.model';
import { CreateBoardDto, ReportCount } from './dto/create.board.dto';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardDB: Repository<BoardEntity>,
  ) {}

  getAllBoards() {
    return this.boardDB.find();
  }

  async getBoardByPage(page: number) {
    const boards = await this.boardDB.find({
      take: 10,
      skip: (page - 1) * 10,
    });

    return {
      success: true,
      body: boards,
      next: page + 1,
    };
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description, name, password, categories } = createBoardDto;
    const board = this.boardDB.create({
      title,
      description, // 이름이 똑같을 경우 (콜론 + 이름)을 생략할수있다.
      status: BoardStatus.PUBLIC,
      name,
      password,
      categories,
    });
    await this.boardDB.save(board);
    return board;
  }

  async getBoardById(id: number) {
    const found = await this.boardDB.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number) {
    const result = await this.boardDB.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`can't find Board with id ${id}`);
    }
  }
  async reportBoard(id: number, reportCount: ReportCount) {
    const board = await this.boardDB.findOneBy({ id });

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    board.reportCount += 1;
    await this.boardDB.save(board);

    if (board.reportCount >= 5) {
      await this.deleteBoard(id);
    }
  }
}
