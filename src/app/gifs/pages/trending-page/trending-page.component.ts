import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-trending-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.scss']
})
export class TrendingPageComponent {

  public apiService = inject(ApiService);

  constructor() {
    this.loadGifs();

    effect(() => {
      const gifs = this.apiService.gifs();
      if (gifs.length) localStorage.setItem('trendingGifs', JSON.stringify(gifs));
    });
  }

  loadGifs(): void {
    this.apiService.getTrendingGifs(0);
  }
  getGifsForColumn(columnIndex: number) {
  return this.apiService.gifs().filter((gif, index) => index % 4 === columnIndex);
}

  refreshGifs(): void {
    this.loadGifs();
  }
}