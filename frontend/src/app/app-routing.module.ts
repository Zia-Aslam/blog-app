import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: 'blog', pathMatch: 'full' },
                    {
                        path: 'blog',
                        loadChildren: () =>
                            import('./demo/components/blog/blog.module').then(m => m.BlogModule),
                    },
                ],
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('./demo/components/auth/auth.module').then(m => m.AuthModule),
            },
            { path: '**', redirectTo: 'blog' }
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
