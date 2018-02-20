import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../services/comment.db';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input()
  comment: IComment;

  @Input()
  outbox = false;

  constructor() { }
}
