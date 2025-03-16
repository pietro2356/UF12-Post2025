import {ErrorHandler, inject, Injectable} from '@angular/core';
import {AppStateManagerService} from '../service/appStateManager/app-state-manager.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LogicalError} from './LogicalError';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler{
  readonly #appState = inject(AppStateManagerService);

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse){
      this.#appState.setStateToError(error.message);
      console.error("##> NET ERRR", error.message);

    }else if(error instanceof LogicalError){
      this.#appState.setStateToError(error.getMessage());
      console.error(error.toString());

    }else{
      this.#appState.setStateToError(error);
      console.error("STD > ", error);
    }
  }
}
