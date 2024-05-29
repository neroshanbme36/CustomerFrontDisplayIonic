import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

// https://stackoverflow.com/questions/62847593/how-to-dynamically-go-to-previous-page-ionic-4

@Injectable({
  providedIn: 'root'
})

export class PreviousRouteService {
  previousUrl = '/';
  showIonBackBtn: boolean | undefined;
  private pCurrentUrl: string;

  constructor(private router: Router) {
    this.pCurrentUrl = this.router.url;

    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.pCurrentUrl = events[1].urlAfterRedirects;
      });
  }

  get currentUrl(): string {
    return this.pCurrentUrl;
  }
};
