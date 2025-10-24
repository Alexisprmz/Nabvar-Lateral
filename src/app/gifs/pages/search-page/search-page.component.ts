import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Gif } from '../../interfaces/giphy.interfaces';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  gifs = this.apiService.gifs;
  loading = this.apiService.loading;
  errorMessage = this.apiService.error;

  searchQuery = '';
 getGifsForColumn(columnIndex: number) {
    return this.gifs().filter((gif, index) => index % 4 === columnIndex);
  }
  constructor() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      if (query) {
        this.searchQuery = query;
        this.apiService.searchGifs(query);
      }
    });
  }
  onSearch(): void {
    const query = this.searchQuery.trim();
    
    if (!query) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
      queryParamsHandling: 'merge'
    });

    this.apiService.searchGifs(query);
  }
}