import { Routes } from '@angular/router';
import { DetailsComponent } from './features/details/details.component';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { CreaPostComponent } from './features/crea-post/crea-post.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dettagli', // /dettagli
        component: DetailsComponent
    },
    // localhost:4200/dettagli/3/tk/pwd -> postId
    {
        path: 'dettagli/:postId', // /dettagli/4
        component: DetailsComponent
    },
    // {
    //     path: 'dettagli/:postId/:token/:passwd', // /dettagli/4
    //     component: DetailsComponent
    // },
    {
        path: 'crea-post',
        component: CreaPostComponent
    },
    {
        path: 'modifica-post/:userId',
        component: CreaPostComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];
