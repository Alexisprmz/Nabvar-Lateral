import { Injectable, inject, signal, effect, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Gif, GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiUrl = 'https://api.giphy.com/v1/gifs';
  private readonly apiKey = 'LhJgmZp2NOzCqyte5q13kjguEUIi4maP';

  gifs = signal<Gif[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  lastQuery = signal<string>('');
  offset = signal(0);
  limit = 20;

  searchHistory = signal<string[]>([]);

  readonly title = computed(() =>
    this.lastQuery()
      ? `Resultados de "${this.lastQuery()}"`
      : 'GIFs en Tendencia'
  );

  constructor() {
    const stored = localStorage.getItem('searchHistory');
    if (stored) this.searchHistory.set(JSON.parse(stored));

    effect(() => {
      const gifs = this.gifs();
      if (gifs.length > 0) {
        localStorage.setItem('lastGifs', JSON.stringify(gifs));
      }
    });
  }
  getTrendingGifs(offset: number = 0) {
    this.loading.set(true);
    this.error.set(null);
    this.lastQuery.set('');

    const url = `${this.apiUrl}/trending?api_key=${this.apiKey}&limit=${this.limit}&rating=g&offset=${offset}`;
    console.log('🌐 Llamando a:', url);

    this.http.get<GiphyResponse>(url).subscribe({
      next: (res) => {
        this.gifs.set(res.data);
        this.loading.set(false);
        this.offset.set(offset);
      },
      error: (err) => {
        this.error.set('Error al cargar los GIFs 😓');
        this.loading.set(false);
        console.error('❌ Error en la API:', err);
      },
    });
  }
  searchGifs(query: string) {
    if (!query.trim()) return;

    this.loading.set(true);
    this.error.set(null);
    this.lastQuery.set(query);

    const history = this.searchHistory();
    if (!history.includes(query)) {
      this.searchHistory.set([query, ...history].slice(0, 10));
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
    }

    const url = `${this.apiUrl}/search?api_key=${this.apiKey}&q=${encodeURIComponent(query)}&limit=${this.limit}&rating=g`;
    console.log('🔍 Buscando en:', url);

    this.http.get<GiphyResponse>(url).subscribe({
      next: (res) => {
        this.gifs.set(res.data);
        this.loading.set(false);
        this.offset.set(0);
      },
      error: (err) => {
        this.error.set('Error al buscar GIFs 😓');
        this.loading.set(false);
        console.error('❌ Error en la API:', err);
      },
    });
  }

  loadHistory() {
    const stored = localStorage.getItem('searchHistory');
    if (stored) {
      this.searchHistory.set(JSON.parse(stored));
    }
  }

  goToSearch(query: string) {
    this.router.navigate(['/dashboard/search'], { queryParams: { q: query } });
  }
}
