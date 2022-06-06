import { Injectable } from '@angular/core';

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

  deleteComment(id: number) {
    localStorage.removeItem(id.toString());
  }
}
