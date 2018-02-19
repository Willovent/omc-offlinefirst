import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../services/commentDb';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: IComment;

  @Input()
  outbox = false;

  constructor() { }

  ngOnInit() {
  }

}
