import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompteComponent } from './component/compte/compte.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { PrestatairesignupComponent } from './component/prestatairesignup/prestatairesignup.component';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './component/signup/signup.component';
import { HttpClientModule , HttpClientJsonpModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { Router } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { GererutilisateurComponent } from './component/Admin/gererutilisateur/gererutilisateur.component';

import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';

import { DaschboardClientComponent } from './component/Client/daschboard-client/daschboard-client.component';
import { ProfilComponent } from './component/Client/profil/profil.component';
import { HomePageComponent } from './component/Client/home-page/home-page.component';
import { CategoryComponent } from './component/Client/category/category.component';
import { ServiceComponent } from './component/Client/service/service.component';
import { CategorieServiceComponent } from './component/Client/categorie-service/categorie-service.component';
import { PrestataireComponent } from './component/Client/prestataire/prestataire.component';
import { ServiceDetailComponent } from './component/Client/service-detail/service-detail.component';
import { DemandeComponent } from './component/Client/demande/demande.component';
import { NavComponent } from './component/Client/nav/nav.component';
import { SidebarComponent } from './component/Client/sidebar/sidebar.component';
import { BesoinComponent } from './component/Client/besoin/besoin.component';
import { SearchComponent } from './component/Client/search/search.component';
import { FilterComponent } from './component/Client/filter/filter.component';
import { PostComponent } from './component/prestataire/post/post.component';
import { DemandeEmploiComponent } from './component/Client/demande-emploi/demande-emploi.component';
import { CommandeServicesComponent } from './component/Client/commande-services/commande-services.component';
import { ResrvationComponent } from './component/Client/resrvation/resrvation.component';
import { AbiltyComponent } from './component/prestataire/abilty/abilty.component';
import { ContactComponent } from './component/contact/contact.component';
import { ServiceformComponent } from './component/prestataire/serviceform/serviceform.component';
import { AgendaComponent } from './component/prestataire/agenda/agenda.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './component/prestataire/navbar/navbar.component';
import { WorkScheduleComponent } from './component/prestataire/work-schedule/work-schedule.component';
import { AddDisponibiliteComponent } from './component/prestataire/add-disponibilite/add-disponibilite.component';
import { EditDisponibiliteComponent } from './component/prestataire/edit-disponibilite/edit-disponibilite.component';
import { ProfileComponent } from './component/prestataire/profile/profile.component';
import { RespondToJobRequestComponent } from './component/prestataire/respond-to-job-request/respond-to-job-request.component';
import { AuthInterceptor } from './shared/auth.interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PortfolioComponent } from './component/prestataire/portfolio/portfolio.component';
import { OffreComponent } from './component/Client/offre/offre.component';
import { TestComponent } from './test/test.component';
import { CategorieComponent } from './component/Admin/categorie/categorie.component';
import { SidebarAdminComponent } from './component/Admin/sidebar-admin/sidebar-admin.component';
import { ChatComponent } from './component/Client/chat/chat.component';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    CompteComponent,
    PrestatairesignupComponent,
    DashboardAdminComponent,
    HomeComponent,
    GererutilisateurComponent,
    DaschboardClientComponent,
    ProfilComponent,
    DaschboardClientComponent,
    HomePageComponent,
    CategoryComponent,
    ServiceComponent,
    CategorieServiceComponent,
    PrestataireComponent,
    ServiceDetailComponent,
    DemandeComponent,
    NavComponent,
    SidebarComponent,
    BesoinComponent,
    SearchComponent,
    FilterComponent,
    PostComponent,
    DemandeEmploiComponent,
    CommandeServicesComponent,
    ResrvationComponent,
    AbiltyComponent,
    ContactComponent,
    ServiceformComponent,
    AgendaComponent,
    NavbarComponent,
    WorkScheduleComponent,
    AddDisponibiliteComponent,
    EditDisponibiliteComponent,
    ProfileComponent,
    RespondToJobRequestComponent,
    PortfolioComponent,  
    
    OffreComponent, TestComponent, CategorieComponent, SidebarAdminComponent, 
    ChatComponent,

    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [ 
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientJsonpModule,
    MatDatepickerModule,
    MatInputModule,
    NgxPaginationModule,
    FormsModule,
    NgxEmojiPickerModule,
   
    
  
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
 
})

export class AppModule { }
