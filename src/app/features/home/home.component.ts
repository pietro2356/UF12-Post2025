import { Component, inject } from '@angular/core';
import { PostManagerService } from '../../core/service/PostManager/post-manager.service';
import { PostCardComponent } from '../../ui/post-card/post-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PostCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  postManagerSrv = inject(PostManagerService);
}
