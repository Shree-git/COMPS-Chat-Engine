import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

const AngularMaterial = [
  MatButtonModule,
  MatExpansionModule,
  MatCardModule
]
@NgModule({
  imports: [
    AngularMaterial
  ],
  exports: [
    AngularMaterial
  ]
})
export class MaterialModule { }
