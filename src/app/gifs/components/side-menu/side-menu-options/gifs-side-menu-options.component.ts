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
      icon: 'fa-solid fa-house',
      title: 'Dashboard',
      subtitle: 'Main page overview',
      router: '/dashboard'
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Trending',
      subtitle: 'The best gifs',
      router: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      title: 'Search',
      subtitle: 'Find your favorite gifs',
      router: '/dashboard/search'
    },
  ];
}
