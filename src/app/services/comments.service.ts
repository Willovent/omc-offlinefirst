import { Injectable } from '@angular/core';
import { CommentDb, IComment } from './commentDb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/interval';

@Injectable()
export class CommentsService {

  private comments: BehaviorSubject<IComment[]> = new BehaviorSubject([]);
  public comments$: Observable<IComment[]> = this.comments.asObservable();
  private outBoxComments: BehaviorSubject<IComment[]> = new BehaviorSubject([]);
  public outBoxComments$: Observable<IComment[]> = this.outBoxComments.asObservable();

  db: CommentDb;
  constructor() {
    this.db = new CommentDb();
    this.updateComments();
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data === 'update') {
        this.updateComments();
      }
    });
  }

  postComment(comment: IComment): Observable<number> {
    const promise = this.db.outBoxComment.add(comment);
    promise.then(() => this.updateComments())
           .then(this.sync);
    return Observable.fromPromise(promise);
  }

  private updateComments() {
    this.db.comment.toArray().then(comments => this.comments.next(comments));
    this.db.outBoxComment.toArray().then(comments => this.outBoxComments.next(comments));
  }

  private sync() {
    navigator.serviceWorker.ready.then(function (swRegistration) {
      return swRegistration.sync.register('sync-outbox');
    });
  }
}
