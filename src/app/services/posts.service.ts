import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../objects/post';
import { Comment } from '../objects/comment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url:string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  get posts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url).pipe(map((elem) => elem.slice(0,10)));
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + `/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + `/${id}/comments`);
  }
  
}
