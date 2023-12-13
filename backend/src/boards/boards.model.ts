export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
  name: string;
  password: string;
  categories: string;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
