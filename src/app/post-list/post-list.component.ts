import { Component, OnInit } from '@angular/core';
import { Post } from '../objects/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.posts.subscribe(data => {this.posts = data;})
  }

}
