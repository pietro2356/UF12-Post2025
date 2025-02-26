import { AppStateManagerService } from './../../core/service/appStateManager/app-state-manager.service';
import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  readonly #appState = inject(AppStateManagerService);
  readonly #router = inject(Router);

  constructor(){
    effect(() => {
      if(this.#appState.state() !== "ERROR")
        this.#router.navigate(["/home"]);
    })
  }
}
