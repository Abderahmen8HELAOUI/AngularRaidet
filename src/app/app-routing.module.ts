import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {AddActivityComponent} from "./activity/add-activity/add-activity.component";
import {ActivitiesListComponent} from "./activity/activities-list/activities-list.component";
import {ActivitiesDetailsComponent} from "./activity/activities-details/activities-details.component";
import {BeneficiariesListComponent} from "./beneficiary/beneficiaries-list/beneficiaries-list.component";
import {BeneficiaryDetailsComponent} from "./beneficiary/beneficiary-details/beneficiary-details.component";
import {AddBeneficiaryComponent} from "./beneficiary/add-beneficiary/add-beneficiary.component";
import {AddDossierComponent} from "./dossier/add-dossier/add-dossier.component";
import {DossiersListComponent} from "./dossier/dossiers-list/dossiers-list.component";
import {DossiersDetailsComponent} from "./dossier/dossiers-details/dossiers-details.component";
import {AddDocumentComponent} from "./document/add-document/add-document.component";
import {DocumentsListComponent} from "./document/documents-list/documents-list.component";
import {DocumentsDetailsComponent} from "./document/documents-details/documents-details.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },

  { path: 'activities', component: ActivitiesListComponent },
  { path: 'activities/:id', component: ActivitiesDetailsComponent },
  { path: 'addActivity', component: AddActivityComponent },

  { path: 'Beneficiaries', component: BeneficiariesListComponent },
  { path: 'Beneficiaries/:id', component: BeneficiaryDetailsComponent },
  { path: 'addBeneficiary', component: AddBeneficiaryComponent },

  { path: 'addDossiers', component: AddDossierComponent },
  { path: 'dossiers', component: DossiersListComponent },
  { path: 'dossiers/:id', component: DossiersDetailsComponent },

  { path: 'addDocument', component: AddDocumentComponent },
  { path: 'documents', component: DocumentsListComponent },
  { path: 'documents/:id', component: DocumentsDetailsComponent },

 { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
