import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from '../boards.model';

@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'ip' })
  name: string;

  @Column()
  password: string;

  @Column()
  categories: string;

  @Column()
  status: BoardStatus;

  @Column({ default: 0 }) // 추가된 부분: reportCount 필드
  reportCount: number;

  @CreateDateColumn() //날짜 설정
  createdAt: Date;
}
