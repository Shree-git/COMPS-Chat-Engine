import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const AngularMaterial = [
  MatButtonModule,
  MatExpansionModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonToggleModule
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
