import { Routes } from '@angular/router';
import { DetailsComponent } from './features/details/details.component';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

export const routes: Routes = [
    // EVENTI
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dettagli', // /dettagli/4
        component: DetailsComponent
    },
    {
        path: 'dettagli/:postId', // /dettagli/4
        component: DetailsComponent
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
