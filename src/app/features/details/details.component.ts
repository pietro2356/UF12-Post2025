import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../core/model/post.model';
import { PostManagerService } from '../../core/service/PostManager/post-manager.service';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  router = inject(ActivatedRoute);
  postManagerSrv = inject(PostManagerService);
  postIdParam = signal(-1);

  postDetail = signal<Post>({} as Post);
  
  constructor(){
    this.postManagerSrv.recuperaPostViaHttp();
  }

  ngOnInit(): void {
    // this.router.queryParams.subscribe((params) => {
    //   console.log("Query Params: ", params);
    // });

    this.router.params.subscribe(param => {
      console.log(param);
      this.postIdParam.set(param['postId']);
      let t = Number(param['postId']);

      this.postDetail.set(this.postManagerSrv.recuperaPostViaId(t ?? -1));
    });
  }

  // showData(){
  //   this.postDetail.set(this.postManagerSrv.postListComp().find((p) => {
  //     console.log(typeof p.userId);
  //     console.log(typeof this.postIdParam());
      
  //     return p.userId === this.postIdParam()
  //   }) ?? {} as Post)

  //   console.log(this.postDetail());

  // }

}
