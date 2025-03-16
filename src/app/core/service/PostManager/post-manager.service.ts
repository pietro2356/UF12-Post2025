import { computed, inject, Injectable, signal } from '@angular/core';
import { Post } from '../../model/post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateManagerService } from '../appStateManager/app-state-manager.service';

/**
 * Servizio per la gestione dei post
 */
@Injectable({
  providedIn: 'root'
})
export class PostManagerService {
  readonly #URL = "https://jsonplaceholder.typicode.com/posts";

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #appState = inject(AppStateManagerService);

  readonly #postList = signal<Post[]>([]);
  readonly postListComp = computed(() => this.#postList());


  constructor() { }

  /**
   * Metodo per recuperare la lista dei post
   * @param postId codice ID del post da cercare
   * @returns Post trovato
   */
  recuperaPostViaId(postId: number | string): Post{
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

    this.#appState.setStateToLoading("Caricamento post in corso...");

    this.#http.get<Post[]>(this.#URL)
    .pipe(
      retry(3),
      /*
      --> RIMOSSI IN QUANTO ORA GESTIAMO GLI ERRORI TRAMITE IL SERVIZIO CUSTOM
      catchError((err) => {
        return of<Post[]>([
          {
            id: -1,
            title: "Post non disponibili",
            userId: -1,
            body: "E3423 - " + err.message,
          }
        ]);
      }),*/
    )
    .subscribe((postList: Post[]) => {
      console.log("Lista dei Post: ", postList);

      // this.#postList.set(postList);
      this.#postList.update(() => [
        ...this.#postList(),
        ...postList
      ]);

      if(postList[0].id === -1) this.#appState.setStateToError("afsds");
      else this.#appState.setStateToReady();
    });
  }

  /**
   * Metodo per generare un post
   */
  generaPost() {
    this.#appState.setStateToLoading();
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
    this.#appState.setStateToReady();
  }

  publicaPost(titolo: string, body: string, userId: number){
    let newPostToCreate: Omit<Post, 'id'> = {
      title: titolo,
      body: body,
      userId: userId,
    };

    console.table(newPostToCreate);

    this.#http.post<Post>(this.#URL, newPostToCreate)
    .pipe(
      retry(3),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    )
    .subscribe((res: Post | null) => {
      if(res !== null){
        this.#postList.update(() => [...this.#postList(), res]);
        this.#router.navigate(['/home']);
      }
    });
  }

  modificaPost(post: Post){
    this.#http.put<Post>(this.#URL + "/" + post.id, post)
    .pipe(
      retry(3),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    )
    .subscribe((updatedPost: Post | null) => {
      if(updatedPost === null) throw new Error("Post non aggiornato");

      // cercare il post dentro la lista locale
      // identificarlo
      // sostituirlo con il post nuovo

      let oldPost = this.#postList().find((post) => post.id === updatedPost.id);
      if(oldPost === undefined) throw new Error("Post non trovato");

      let oldPostIndex = this.#postList().indexOf(oldPost);
      if(oldPostIndex === -1) throw new Error("Post non trovato");

      this.#postList()[oldPostIndex] = updatedPost;

      this.#router.navigate(['/home']);
    });
  }

  eliminaPost(id: number){
    this.#http.delete(this.#URL + "/" + id)
    .pipe(
      retry(3),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    )
    .subscribe(() => {
      this.#postList.update(() => {
        return this.#postList().filter((p) => p.id !== id);
      })
    });
  }
}
