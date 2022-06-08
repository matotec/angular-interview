import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bad-route',
  templateUrl: './bad-route.component.html',
  styleUrls: ['./bad-route.component.scss']
})
export class BadRouteComponent implements OnInit {
  id!: number;
  messageError: string = "D'oh, la pagina que intentas solicitar no esta en el servidor"
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params['id']);
  }

}
