import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialDepsModule } from './material-deps/material-deps.module';
import { CommentsService } from './services/comments.service';
import { CommentComponent } from './component/comment/comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent
  ],
  imports: [
    MaterialDepsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
