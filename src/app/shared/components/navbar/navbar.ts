import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
})
export class Navbar {
  router = inject(Router);
  routes = routes
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Mapas en Angular'}`,
    }))
    .filter((route) => route.path !== '**');

  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    // tap((event) => console.log(event)),
    map((event) => event.url),
    map((url) => this.routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas en Angular')
  );

  pageTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // tap((event) => console.log(event)),
      map((event) => event.url),
      map(
        (url) => this.routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas en Angular'
      )
    )
  );
}
