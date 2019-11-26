import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './services/service.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { GopyComponent } from './gopy/gopy.component';
import { HoidapComponent } from './hoidap/hoidap.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DoimatkhauComponent } from './doimatkhau/doimatkhau.component';
import { CapnhattaikhoanComponent } from './capnhattaikhoan/capnhattaikhoan.component';
import { DanhmucmonhocComponent } from './danhmucmonhoc/danhmucmonhoc.component';
import { QuenmatkhauComponent } from './quenmatkhau/quenmatkhau.component';
import { ThitracnghiemComponent } from './thitracnghiem/thitracnghiem.component';
import { EditpasswordComponent } from './editpassword/editpassword.component';
import { EditaccountComponent } from './editaccount/editaccount.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrangchuComponent,
    GioithieuComponent,
    LienheComponent,
    GopyComponent,
    HoidapComponent,
    DangnhapComponent,
    DangkyComponent,
    DoimatkhauComponent,
    CapnhattaikhoanComponent,
    DanhmucmonhocComponent,
    QuenmatkhauComponent,
    ThitracnghiemComponent,
    EditpasswordComponent,
    EditaccountComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: TrangchuComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'trangchu', component: TrangchuComponent },
      { path: 'gioithieu', component: GioithieuComponent },
      { path: 'lienhe', component: LienheComponent },
      { path: 'gopy', component: GopyComponent },
      { path: 'hoidap', component: HoidapComponent },
      { path: 'dangky', component: DangkyComponent },
      { path: 'dangnhap', component: DangnhapComponent },
      { path: 'quenmatkhau', component: QuenmatkhauComponent },
      { path: 'doimatkhau', component: DoimatkhauComponent },
      { path: 'capnhattaikhoan', component: CapnhattaikhoanComponent },
      { path: 'danhmucmonhoc', component: DanhmucmonhocComponent },
      { path: 'thitracnghiem', component: ThitracnghiemComponent },
      { path: 'danhmucmonhoc/:mId', component: ThitracnghiemComponent },
      { path: '**', redirectTo: 'trangchu', pathMatch: 'full' },
    ])
  ],

  providers: [
    ServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
