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
  private db: CommentDb;

  constructor() {
    this.db = new CommentDb();
    navigator.serviceWorker.register('/sw.js');
    this.updateComments();
    this.registerPushNotif();
    this.registerMessageEvents();
  }

  postComment(comment: IComment): Observable<void> {
    const promise = this.db.outBoxComment
      .add(comment)
      .then(() => this.updateComments())
      .then(() => this.sync());
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

  private registerPushNotif() {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(serverKey)
      }).then((pushSubscription) => {
        fetch('http://localhost:8080/sub', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(pushSubscription)
        });
      });
    });
  }

  private registerMessageEvents() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data === 'update') {
        this.updateComments();
      }
    });
  }

  private urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}


const serverKey = 'BNEkbZKhisrNksovQYTgmytwoH2R4k8DM3QWNQooBkOiH12GghIB2nJXvmZVT9_xDHwcicOE6eDd6eU0sb1BwP0';
