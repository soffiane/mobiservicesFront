import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
const importExport = [
 MatButtonModule, MatInputModule, MatToolbarModule, MatFormFieldModule,MatIconModule
]
@NgModule({
 imports: importExport,
 exports: importExport,
})
export class AppMaterialModule { }
