import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MobileEndIconsComponent } from './mobile-end-icons/mobile-end-icons.component';
import { SearchProductPipe } from './search-product.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileEndIconsComponent,
    SearchProductPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MobileEndIconsComponent,
    RouterModule,
    FormsModule,
    SearchProductPipe
  ]
})
export class SharedModule { 
  
}
