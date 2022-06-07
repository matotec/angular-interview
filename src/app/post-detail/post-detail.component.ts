import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../objects/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  currentId!: number;
  dateLastComment!: string;
  constructor( private postsService: PostsService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentId = params['id'];
      this.postsService.getPost(this.currentId).subscribe(
        post => this.post = post,
        () => {
          this.router.navigate(['/404/' + this.currentId]);
        }
      )
    })
  }

  sendDate(date: string) {
    this.dateLastComment = date;
  }

}
