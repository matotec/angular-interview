import { Injectable } from '@angular/core';
import { Comment } from '../objects/comment';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }

  addComment(comment: Comment, id: number) {
    let data = this.getComment(id);
    data ? data.push(comment) : (data = [comment]);
    this.setComment(id,data);
  }

  setComment<t>(id: number, data: t) {
    localStorage.setItem(id.toString(), JSON.stringify(data));
  }

  getComment(id: number): Comment[] {
    let data = localStorage.getItem(id.toString());

    return data ? JSON.parse(data) : [];
  }

  deleteComment(comment: Comment,id: number) {
    const data = this.getComment(id);
    data.splice(data.findIndex(elem => elem.date === comment.date), 1);
    this.setComment(id, data);
  }
}
