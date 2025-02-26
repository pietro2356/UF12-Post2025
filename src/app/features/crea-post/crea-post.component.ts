import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, model } from '@angular/core';
import { PostManagerService } from '../../core/service/PostManager/post-manager.service';
import { Post } from '../../core/model/post.model';

@Component({
  selector: 'app-crea-post',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './crea-post.component.html',
  styleUrl: './crea-post.component.scss'
})
export class CreaPostComponent {

  postMangerSrv = inject(PostManagerService);

  // titolo = new FormControl<string>('', [Validators.required]);
  // body = new FormControl('');
  // userId = new FormControl<number>(-1);

  titolo = model.required<string>();
  body = model.required<string>();
  userId = model.required<number>();

  id = model<string>("-999");

  convertToNumber(val: string|null){
    return Number(val);
  }

  verificaInput(titolo: string, body: string, userId: number){
    if(titolo.length <= 3) return false;
    if(body.length <= 5) return false;
    if(userId < 0) return false;
    
    return true;
  }

  impostaPostDiDefault(){
    this.titolo.set('CIAO SONO IL TITOLO DI DEFAULT');
  }

  modificaPost(){
    const tmpPost: Post = {
      title: this.titolo(),
      body: this.body(),
      userId: this.userId(),
      id: this.convertToNumber(this.id())
    };

    this.postMangerSrv.modificaPost(tmpPost);
  }
}
