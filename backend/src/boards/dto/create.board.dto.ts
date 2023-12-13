import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  categories: string;

  @IsNotEmpty()
  description: string;
}

export class ReportCount {
  reportCount: ReportCount;
}
