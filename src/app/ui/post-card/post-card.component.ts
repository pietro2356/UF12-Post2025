import { Component, inject, input } from '@angular/core';
import { Post } from '../../core/model/post.model';
import { PostManagerService } from '../../core/service/PostManager/post-manager.service';
import { Router } from '@angular/router';
import { AppStateManagerService } from '../../core/service/appStateManager/app-state-manager.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  post = input.required<Post>();

  postManagerSrv = inject(PostManagerService);
  appState = inject(AppStateManagerService);
  router = inject(Router);

  visualizzaDettagli(postId: number){
    // /dettagli/:id
    this.router.navigate(['/dettagli/'+postId]);
  }
  modifca(){
    // this.router.navigate(["/modifica-post/"+this.post().userId+"?titolo="+this.post().title+"&body="+this.post().body]);
    this.router.navigate(["/modifica-post",
      this.post().id, 
      this.post().userId, 
      this.post().title, 
      this.post().body
    ]);
  }
}
