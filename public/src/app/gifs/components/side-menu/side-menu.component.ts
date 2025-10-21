import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { GifsSideMenuHeaderComponent } from './side-menu-header/gifs-side-menu-header.component';
import { GifsSideMenuOptionsComponent } from './side-menu-options/gifs-side-menu-options.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public apiService = inject(ApiService);

  constructor() {
    this.apiService.loadHistory(); // cargar historial al iniciar
  }
}
