import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';
import { ProgressControlService } from '../../core/services/progress-control.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public mainPage$ = new Subject<boolean>();

  public pagesVisited: string[] = [];

  public prevUrl = '';

  constructor(router: Router, private stepperService: ProgressControlService) {
    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.setMainPage(e.urlAfterRedirects);

        this.setStepperIndex(e.urlAfterRedirects);

        this.pagesVisited.push(e.url);

        this.setPrevUrl();
      }
    });
  }

  private setMainPage(url: string): void {
    if (url.includes('main')) {
      document.body.classList.add('main-page');
      this.mainPage$.next(true);
    } else {
      document.body.classList.remove('main-page');
      this.mainPage$.next(false);
    }
  }

  private setPrevUrl(): void {
    if (this.pagesVisited.length > 1) {
      this.prevUrl = this.pagesVisited[this.pagesVisited.length - 2];
    } else if (this.pagesVisited.length) {
      [this.prevUrl] = this.pagesVisited;
    }
  }

  private setStepperIndex(url: string): void {
    switch (url) {
      case '/booking/flights':
        this.stepperService.stepper.selectedIndex = 0;
        break;
      case '/booking/process':
        this.stepperService.stepper.selectedIndex = 1;
        break;
      case '/booking/summary':
        this.stepperService.stepper.selectedIndex = 2;
        break;
      default:
    }
  }
}
