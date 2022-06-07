import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { StorageService } from '../services/storage.service';
import { Comment } from '../objects/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() id!: number;
  @Output() dateLastComment = new EventEmitter<string>();
  comments: Comment[] = [];
  currentComments: Comment[] = [];
  form!: FormGroup;
  
  constructor(
    private postsService: PostsService,
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.postsService.getComments(this.id).subscribe((data) => {
      this.comments = data;
      this.currentComments = data;
      if(this.getCommentsFromStorage(this.id)){
        this.comments = [...this.comments, ...this.getCommentsFromStorage(this.id)];
      }
    });
  }

  getCommentsFromStorage(id: number): Comment[] {
    return this.storageService.getComment(id)
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
    ],
  ],
  body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  lastCommentDate() {
    const data = this.comments[this.comments.length - 1];
    return data.date ? data.date : '';
  }

  emitData() {
    this.dateLastComment.emit(String(this.lastCommentDate()));
  }

  deleteComment(id: number) {
    this.storageService.deleteComment(this.comments[id], this.id);
    this.refreshComments();
  }

  invalid(control: string) {
    return this.form.controls[control].errors && this.form.controls[control].touched;
  }

  valid(control: string) {
    return !this.form.controls[control].errors && this.form.controls[control].touched
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const comment = this.form.value as Comment;
    comment.date = new Date();
    this.storageService.addComment(comment, this.id);
    this.form.reset();
    this.refreshComments();
  }

  refreshComments() {
    this.comments = this.currentComments;
    if(this.getCommentsFromStorage(this.id)) {
      this.comments = [...this.comments, ...this.getCommentsFromStorage(this.id)];
    }
  }

}
