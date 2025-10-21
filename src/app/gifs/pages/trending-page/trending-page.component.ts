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

  // 🔹 Servicio público para poder acceder desde el template
  public apiService = inject(ApiService);

  constructor() {
    // Cargar los GIFs al iniciar
    this.loadGifs();

    // Guardar GIFs en localStorage automáticamente
    effect(() => {
      const gifs = this.apiService.gifs();
      if (gifs.length) localStorage.setItem('trendingGifs', JSON.stringify(gifs));
    });
  }

  // 🔥 Cargar GIFs usando el servicio
  loadGifs(): void {
    this.apiService.getTrendingGifs(0);
  }

  // 🔄 Actualizar GIFs (recargar desde el inicio)
  refreshGifs(): void {
    this.loadGifs();
  }
}