import { Component, inject } from '@angular/core';
import { PostCardComponent } from './ui/post-card/post-card.component';
import { PostManagerService } from './core/service/PostManager/post-manager.service';

@Component({
  selector: 'app-root',
  imports: [PostCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * - Con quali dati lavoriamo?
   * - Come li stutturiamo?
   * - Architettura del progetto
   * - Creiamo il componente post [card-lista]
   *
   * 1)
   *  Post
   *    - titolo
   *    - descrizione
   *    - id
   *    - userId
   *
   * 2) interfaccia
   * 3)
   *
   */

  postManagerSrv = inject(PostManagerService);
}
