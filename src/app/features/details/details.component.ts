import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostManagerService } from '../../core/service/PostManager/post-manager.service';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent{
  // Servizio per la gestione del nostro postMangerService
  readonly postManagerSrv = inject(PostManagerService);
  
  // Variabili InputSignal che grazie alla funzione withComponentInputBinding() dentro al file app.config.ts
  // ci permette di fare un accoppiamento tra parametri sull'URL e variabili del compomente.
  readonly postId = input<number>();
  readonly token = input<string>();
  readonly passwd = input<string>();

  // Questo computed converte il valore postId() da stringa a numero, se il valore non esiste viene ritornato -999
  // in modo da andare in errore e mostrare il messaggio corrispettivo nel template
  readonly postIdNumber = computed<number>(() => this.postId() ? Number(this.postId()) ?? -999 : -999);
}
