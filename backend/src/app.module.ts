import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
// import { ConfigurationModule } from './config/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './boards/entity/board.entity';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'back',
      password: 'back',
      database: 'back',
      entities: [BoardEntity],
      synchronize: true,
    }),
    BoardsModule,
    // ConfigurationModule,
  ],
})
export class AppModule {}
