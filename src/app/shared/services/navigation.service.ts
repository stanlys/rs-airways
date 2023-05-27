import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public mainPage$ = new Subject<boolean>();

  public pagesVisited: string[] = [];

  public prevUrl = '';

  constructor(router: Router) {
    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.urlAfterRedirects.includes('main')) {
          document.body.classList.add('main-page');
          this.mainPage$.next(true);
        } else {
          document.body.classList.remove('main-page');
          this.mainPage$.next(false);
        }

        this.pagesVisited.push(e.url);

        if (this.pagesVisited.length > 1) {
          this.prevUrl = this.pagesVisited[this.pagesVisited.length - 2];
        } else if (this.pagesVisited.length) {
          [this.prevUrl] = this.pagesVisited;
        }
      }
    });
  }
}
