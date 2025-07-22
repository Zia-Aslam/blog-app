import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

// Components
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
    declarations: [BlogHomeComponent, BlogDetailComponent, BlogCreateComponent, BlogEditComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BlogRoutingModule,
        AgGridModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        CardModule,
        DividerModule,
        ToolbarModule,
        ConfirmDialogModule,
        ToastModule,
    ],
    providers: [MessageService, ConfirmationService],
})
export class BlogModule {}
