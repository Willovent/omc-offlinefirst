
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatFormField, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule,  MatCardModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule]
})
export class MaterialDepsModule { }
