import Dexie from 'dexie';

export class CommentDb extends Dexie {

  public comment: Dexie.Table<IComment, number>;
  public outBoxComment: Dexie.Table<IComment, number>;

  constructor() {
    super('CommentDb');
    this.version(1).stores({
      comment: '++id, content, user, date',
      outBoxComment: '++id, content, user, date',
    });
  }
}

export interface IComment {
  id?: number;
  content: string;
  user: string;
  date: Date;
}
