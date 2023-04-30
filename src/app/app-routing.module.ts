import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompteComponent } from './component/compte/compte.component';

import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PrestatairesignupComponent } from './component/prestatairesignup/prestatairesignup.component';
import { SignupComponent } from './component/signup/signup.component';
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
import { BesoinComponent } from './component/Client/besoin/besoin.component';
import { PostComponent } from './component/prestataire/post/post.component';
import { DemandeEmploiComponent } from './component/Client/demande-emploi/demande-emploi.component';
import { CommandeServicesComponent } from './component/Client/commande-services/commande-services.component';
import { ResrvationComponent } from './component/Client/resrvation/resrvation.component';
import { AbiltyComponent } from './component/prestataire/abilty/abilty.component';
import { ContactComponent } from './component/contact/contact.component';
import { ServiceformComponent } from './component/prestataire/serviceform/serviceform.component';
import { WorkScheduleComponent } from './component/prestataire/work-schedule/work-schedule.component';
import { EditDisponibiliteComponent } from './component/prestataire/edit-disponibilite/edit-disponibilite.component';
import { ProfileComponent } from './component/prestataire/profile/profile.component';
import { AddDisponibiliteComponent } from './component/prestataire/add-disponibilite/add-disponibilite.component';
import { RespondToJobRequestComponent } from './component/prestataire/respond-to-job-request/respond-to-job-request.component';
import { PortfolioComponent } from './component/prestataire/portfolio/portfolio.component';
import { OffreComponent } from './component/Client/offre/offre.component';
import { TestComponent } from './test/test.component';
import { CategorieComponent } from './component/Admin/categorie/categorie.component';
import { ChatComponent } from './component/Client/chat/chat.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
 {path:'compte',component:CompteComponent},
 {path:'psignup',component:PrestatairesignupComponent},
 {path:'contact',component:ContactComponent},
 //Admin
  {path:'dashboard',component:DashboardAdminComponent},
 {path:'gererutilisateur',component:GererutilisateurComponent},
 //Client
{path:'dashboardClient',component:DaschboardClientComponent},
{path:'profil',component:ProfilComponent},
{path:'home',component:HomePageComponent},
{path:'category',component:CategoryComponent},
{path:'category_service',component:CategorieServiceComponent},
{path:'service',component:ServiceComponent},
{path:'prestataire',component:PrestataireComponent},
{path:'detail',component:ServiceDetailComponent},
{path:'Demandes',component:DemandeComponent},
{path:'besoin',component:BesoinComponent},
{path:'demandeemploi',component:DemandeEmploiComponent},
{path:'commandeService',component:CommandeServicesComponent},
{path:'reserve',component:ResrvationComponent},
{path:'abilty',component:AbiltyComponent},
{path:'besoin/:id',component:BesoinComponent},
{path:'portfolio/:id',component:PortfolioComponent},
{path:'besoin',component:BesoinComponent},
{path:'offre',component:OffreComponent},
{path:'offre/:id',component:OffreComponent},
{path:'chat',component:ChatComponent},
//prestataire
{path:'post',component:PostComponent},
{path:'serviceform',component:ServiceformComponent},
{path:'availbilty',component:WorkScheduleComponent},
{path:'edit-disponibilite/:id',component:EditDisponibiliteComponent},
{path:'profile',component:ProfileComponent},
{path:'app-add-disponibilite',component:AddDisponibiliteComponent},
{path:'respondTorequest',component:RespondToJobRequestComponent},
{path:'portfolio',component:PortfolioComponent},
{path:'categorie',component:CategorieComponent},
{path:'test',component:TestComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
