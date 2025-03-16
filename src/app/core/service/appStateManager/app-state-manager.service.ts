import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppStateManagerService {
  readonly #internalAppState = signal<AppState>(InitialAppState);
  readonly #router = inject(Router);
  readonly #msgSrv = inject(MessageService);

  public state: Signal<State> = computed<State>(() => this.#internalAppState().state);
  public message: Signal<Message> = computed<Message>(() => this.#internalAppState().message);


  constructor(){}


  public setStateToReady(){
    this.#internalAppState.update(() => {
      return {
        state: "READY",
      }
    });
    this.#msgSrv.add({
      severity: 'success',
      detail: 'Operazione completata con successo'
    })
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
    this.#msgSrv.add({
      severity: 'error',
      summary: 'C\'è stato un errore',
      detail: _message,
      sticky: true
    })
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
