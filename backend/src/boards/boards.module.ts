import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entity/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])], 
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
