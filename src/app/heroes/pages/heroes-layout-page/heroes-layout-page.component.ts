import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { Router } from '@angular/router';

interface sidebarItems {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-heroes-layout-page',
  templateUrl: './heroes-layout-page.component.html',
  styleUrls: ['./heroes-layout-page.component.css'],
})
export class HeroesLayoutPageComponent implements OnInit {
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  // * with signals:
  // public user = computed(() => {
  //   this.authService.currentUser()
  // })
  // * with no signals (because this whole module has been done without any signals)
  fetchedName: string | undefined;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      return (this.fetchedName = user?.username);
    });
  }
  public myItems: sidebarItems[] = [
    {
      label: 'List',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Add',
      icon: 'add',
      url: './new-hero',
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search',
    },
  ];

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
