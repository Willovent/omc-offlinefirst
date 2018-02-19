
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormField,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  exports: [MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule]
})
export class MaterialDepsModule { }
