import { Component, signal } from '@angular/core';
import { Post } from './core/model/post.model';
import { PostCardComponent } from "./ui/post-card/post-card.component";

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

  postList = signal<Post[]>([]);

  generaPost(){
    this.postList.update(item => {
      return [...item, {
        titolo: "Seconda lezione all'AFP",
        body: 'Stiamo imparando a creare progetti con Angular e a strutturarli',
        id: 0,
        userId: Math.floor(Math.random() * 100),
      }];
    });
  }
}

class Pippo{
  prop: string = "sdfsd";
}