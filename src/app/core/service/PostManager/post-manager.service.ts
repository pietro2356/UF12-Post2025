import { computed, inject, Injectable, signal } from '@angular/core';
import { Post } from '../../model/post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostManagerService {
  #URL = "https://jsonplaceholder.typicode.com/posts";

  #http = inject(HttpClient);

  #postList = signal<Post[]>([]);
  readonly postListComp = computed(() => this.#postList());


  constructor() { }

  /**
   * Metodo per recuperare la lista dei post
   * @param postId codice ID del post da cercare
   * @returns Post trovato
   */
  recuperaPostViaId(postId: number): Post{
    console.log("Postlist:", this.#postList());
    console.log("postId:", postId);
    console.log("find:", this.#postList().find(p => p.id === postId));
    
    return this.#postList().find(p => p.id === postId) ?? {
      id: -999,
      title: "Post non disponibili",
      userId: -999,
      body: "E3423",
    };
  }

  /**
   * Metodo per recuperare i post via http
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
            title: "Post non disponibili",
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
   * Metodo per generare un post
   */
  generaPost() {
    this.#postList.update((item: Post[]) => {
      return [
        ...item,
        {
          title: "Seconda lezione all'AFP",
          body: 'Stiamo imparando a creare progetti con Angular e a strutturarli',
          id: 0,
          userId: Math.floor(Math.random() * 100),
        },
      ];
    });
  }
}