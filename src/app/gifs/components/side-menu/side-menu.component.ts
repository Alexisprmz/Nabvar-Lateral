import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from './side-menu-header/gifs-side-menu-header.component';
import { GifsSideMenuOptionsComponent } from './side-menu-options/gifs-side-menu-options.component';
@Component({
  selector: 'app-side-menu',
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent { }
