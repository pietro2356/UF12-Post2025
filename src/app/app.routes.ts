import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dettagli', // /dettagli
        //component: DetailsComponent
        loadComponent(){
          return import('./features/details/details.component').then(m => m.DetailsComponent);
        }
    },
    // localhost:4200/dettagli/3/tk/pwd -> postId
    {
        path: 'dettagli/:postId', // /dettagli/4
        loadComponent(){
          return import('./features/details/details.component').then(m => m.DetailsComponent);
        }
    },
    // {
    //     path: 'dettagli/:postId/:token/:passwd', // /dettagli/4
    //     component: DetailsComponent
    // },
    {
        path: 'crea-post',
        //component: CreaPostComponent
        loadComponent(){
          return import('./features/crea-post/crea-post.component').then(m => m.CreaPostComponent);
        }
    },
    {
        path: 'modifica-post/:id/:userId/:titolo/:body',
        loadComponent(){
          return import('./features/crea-post/crea-post.component').then(m => m.CreaPostComponent);
        }
    },
    {
        path: 'not-found',
        //component: PageNotFoundComponent
        loadComponent(){
          return import('./features/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
        }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent(){
          return import('./features/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
        }
    },
];
