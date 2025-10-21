import { Component } from '@angular/core';
import { OptionMenuComponent } from '../option-menu/option-menu.component';
import { CommonModule } from '@angular/common';

interface MenuOption {
  icon: string;
  title: string;
  subtitle: string;
  router: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  standalone: true,
  imports: [OptionMenuComponent, CommonModule],
  templateUrl: './gifs-side-menu-options.component.html',
  styleUrls: ['./gifs-side-menu-options.component.scss']
})
export class GifsSideMenuOptionsComponent {

  menuOptions: MenuOption[] = [
    {
      icon: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Main page overview',
      router: '/dashboard/home'
    },
    {
      icon: 'trending_up',
      title: 'Trending',
      subtitle: 'The best gifs',
      router: '/dashboard/trending'
    },
    {
      icon: 'search',
      title: 'Search',
      subtitle: 'Find your favorite gifs',
      router: '/dashboard/search'
    },
  ];
}
