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

  // Signals directos desde el servicio
  gifs = this.apiService.gifs;
  loading = this.apiService.loading;
  errorMessage = this.apiService.error;

  // Variable para el input de búsqueda
  searchQuery = '';

  constructor() {
    // Suscribirse a los query params de la URL
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      if (query) {
        this.searchQuery = query;
        this.apiService.searchGifs(query);
      }
    });
  }

  // Método para realizar la búsqueda
  onSearch(): void {
    const query = this.searchQuery.trim();
    
    if (!query) return;

    // Actualizar la URL con el query param
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
      queryParamsHandling: 'merge'
    });

    // Realizar la búsqueda
    this.apiService.searchGifs(query);
  }
}