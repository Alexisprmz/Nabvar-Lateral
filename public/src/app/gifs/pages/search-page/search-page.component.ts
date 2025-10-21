import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Gif } from '../../interfaces/giphy.interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  // Signals directos desde el servicio
  gifs = this.apiService.gifs;
  loading = this.apiService.loading;
  errorMessage = this.apiService.error;

  constructor() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      if (query) this.apiService.searchGifs(query);
    });
  }
}
