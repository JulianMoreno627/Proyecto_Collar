import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showDashboardCards = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const navEndEvent = event as NavigationEnd;
      this.showDashboardCards = navEndEvent.urlAfterRedirects === '/admin' || 
                                navEndEvent.urlAfterRedirects === '/admin/';
    });
  }
}
