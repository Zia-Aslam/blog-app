import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { AuthGuard } from '../../service/auth.guard';
import { BlogEditComponent } from './blog-edit/blog-edit.component';

const routes: Routes = [
    { path: '', component: BlogHomeComponent },
    { path: 'post/:id', component: BlogDetailComponent },
    {
        path: 'create',
        component: BlogCreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit/:id',
        component: BlogEditComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BlogRoutingModule {}
