import { Component, OnInit } from '@angular/core';
import { IComment } from './services/commentDb';
import { CommentsService } from './services/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  comments: IComment[];
  outBoxComment: IComment[];
  newComment: IComment = { content: '', date: null, user: '' };
  ngOnInit(): void {
    navigator.serviceWorker.register('/sw.js');
    this.commentsService.comments$.subscribe(comments => this.comments = comments);
    this.commentsService.outBoxComments$.subscribe(comments => this.outBoxComment = comments);
  }

  constructor(private commentsService: CommentsService) {
  }

  submit() {
    this.newComment.date = new Date();
    this.commentsService.postComment(this.newComment);
    this.newComment = { content: '', date: null, user: '' };
  }
}
