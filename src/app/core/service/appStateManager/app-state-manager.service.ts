import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppStateManagerService {
  readonly #internalAppState = signal<AppState>(InitialAppState);
  readonly #router = inject(Router);
  
  public state: Signal<State> = computed<State>(() => this.#internalAppState().state);
  public message: Signal<Message> = computed<Message>(() => this.#internalAppState().message);


  constructor(){
    effect(() => {
      console.table(this.#internalAppState());
    });
  }


  public setStateToReady(){
    this.#internalAppState.update(() => {
      return {
        state: "READY",
      }
    });
  }

  public setStateToLoading(_message?: Message){
    this.#internalAppState.update(() => {
      return {
        state: "LOADING",
        message: _message
      }
    });
  }
  
  public setStateToError(_message: Message){
    this.#internalAppState.update(() => {
      return {
        state: "ERROR",
        message: _message
      }
    });
    this.#router.navigate(['/not-found'])
  }
}

/**
 * READY, LOADING, ERROR
 * 
 * - Impostare lo stato
 * - Visualizzare lo stato
 */

type State = "READY" | "ERROR" | "LOADING";
type Message = string | undefined;
interface AppState{
  state: State,
  message?: Message
}

const InitialAppState: AppState = {
  state: 'LOADING',
  message: "App in caricamento..."
}