import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateManagerService } from './core/service/appStateManager/app-state-manager.service';
import { ButtonModule } from 'primeng/button';
import {LogicalError} from './core/ErrorManager/LogicalError';
import {Toast} from 'primeng/toast';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly appState = inject(AppStateManagerService);

  lanciaErrore(){
    throw new Error("Errore lanciato da giggino AppComponent");
  }

  lanciaLogicalError(){
    throw new LogicalError("Logica fallace", "AppComponent");
  }
}
