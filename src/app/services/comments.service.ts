import { Injectable } from '@angular/core';
import { CommentDb, IComment } from './commentDb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class CommentsService {

  private comments: BehaviorSubject<IComment[]> = new BehaviorSubject([{
    content: 'Hello !',
    date: new Date(),
    user: 'William'
  }, {
    content: 'Bonjour !',
    date: new Date('12-11-2016'),
    user: 'Paul'
  }]);
  public comments$: Observable<IComment[]> = this.comments.asObservable();

  db: CommentDb;
  constructor() {
    this.db = new CommentDb();
    // this.updateComments();
  }

  postComment(comment: IComment): Observable<number> {
    const promise = this.db.outBoxComment.add(comment);
    return Observable.fromPromise(promise);
  }

  private updateComments() {
    this.db.comment.toArray().then(comments => this.comments.next(comments));
  }
}
