import { Component, inject, input } from '@angular/core';
import { Post } from '../../core/model/post.model';
import { PostManagerService } from '../../core/service/PostManager/post-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  post = input.required<Post>();

  postManagerSrv = inject(PostManagerService);
  router = inject(Router);

  visualizzaDettagli(postId: number){
    // /dettagli/:id
    console.log(postId);
    this.router.navigate(['/dettagli/'+postId]);
  }
}
