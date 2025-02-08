import { computed, inject, Injectable, signal } from '@angular/core';
import { Post } from '../../model/post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';

/**
 * Servizio per la gestione dei post
 */
@Injectable({
  providedIn: 'root'
})
export class PostManagerService {
  /**
   * URL per la richiesta dei post
   * @private
   */
  #URL = "https://jsonplaceholder.typicode.com/posts";

  /**
   * Servizio per le chiamate HTTP
   * @private
   */
  #http = inject(HttpClient);

  /**
   * Lista locale dei post
   * @private
   */
  #postList = signal<Post[]>([]);

  /**
   * Lista dei post disponibile per la verso l'esterno del servizio
   */
  postListComp = computed(() => this.#postList());


  constructor() { }

  /**
   * Recupera i post via HTTP e li salva nella lista locale #postList.
   *
   * Se la richiesta HTTP fallisce, viene restituito un post fittizio con un messaggio di errore.
   * @returns void
   */
  recuperaPostViaHttp(): void{
    this.#http.get<Post[]>(this.#URL)
    .pipe(
      retry(3),
      catchError((err) => {
        console.error(err);
        return of<Post[]>([
          {
            id: -1,
            titolo: "Post non disponibili",
            userId: -1,
            body: "E3423 - " + err.message,
          }
        ]);
      }),
    )
    .subscribe((postList: Post[]) => {
      console.log("Lista dei Post: ", postList);
      this.#postList.set(postList);
    });
  }

  /**
   * Aggiunge un post manuale alla lista locale #postList
   * @returns void
   */
  generaPost() {
    this.#postList.update((item: Post[]) => {
      return [
        ...item,
        {
          titolo: "Seconda lezione all'AFP",
          body: 'Stiamo imparando a creare progetti con Angular e a strutturarli',
          id: 0,
          userId: Math.floor(Math.random() * 100),
        },
      ];
    });
  }
}
