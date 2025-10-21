import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- IMPORTAR

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private router = inject(Router);

  query: string = '';

  search(): void {
    if (!this.query.trim()) return;
    // Redirige a /search con query param
    this.router.navigate(['/dashboard/search'], { queryParams: { q: this.query.trim() } });
    this.query = ''; // opcional: limpiar input
  }
}
