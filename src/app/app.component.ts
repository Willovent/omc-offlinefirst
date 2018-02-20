import { Component, OnInit } from '@angular/core';
import { IComment } from './services/comment.db';
import { CommentsService } from './services/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  comments: IComment[];
  outBoxComments: IComment[];
  newComment: IComment = { content: '', date: null, user: '' };

  ngOnInit(): void {
    this.commentsService.comments$.subscribe(comments => this.comments = comments);
    this.commentsService.outBoxComments$.subscribe(comments => this.outBoxComments = comments);
  }

  constructor(private commentsService: CommentsService) {
  }

  submit() {
    this.newComment.date = new Date();
    this.commentsService.postComment(this.newComment).subscribe();
    this.newComment = { content: '', date: null, user: '' };
  }
}
