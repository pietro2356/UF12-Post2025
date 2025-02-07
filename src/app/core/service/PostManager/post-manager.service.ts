import { computed, inject, Injectable, signal } from '@angular/core';
import { Post } from '../../model/post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostManagerService {
  #URL = "https://jsonplaceholder.typicode.com/possdfts";

  #http = inject(HttpClient);

  #postList = signal<Post[]>([]);
  postListComp = computed(() => this.#postList());


  constructor() { }

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