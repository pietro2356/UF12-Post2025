import { Component, inject, signal } from '@angular/core';
import { Post } from './core/model/post.model';
import { PostCardComponent } from './ui/post-card/post-card.component';
import { PostManagerService } from './core/service/PostManager/post-manager.service';
import { HttpClient } from '@angular/common/http';

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

  #http = inject(HttpClient);

  postManagerSrv = inject(PostManagerService);
  constructor() {}
}
