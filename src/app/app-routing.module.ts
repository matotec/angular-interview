import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';

export const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: 'posts'},
  { path: 'posts', component: PostListComponent},
  { path: 'post/:id', component: PostDetailComponent},
  { path: '404', component: BadRouteComponent},
  { path: '404/:id', component: BadRouteComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
