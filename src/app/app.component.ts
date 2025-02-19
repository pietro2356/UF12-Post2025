import { Component, inject, signal } from '@angular/core';
import { Post } from './core/model/post.model';
import { PostCardComponent } from './ui/post-card/post-card.component';
import { PostManagerService } from './core/service/PostManager/post-manager.service';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}
