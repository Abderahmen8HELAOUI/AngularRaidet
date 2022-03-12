import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddActivityComponent } from './activity/add-activity/add-activity.component';
import { ActivitiesDetailsComponent } from './activity/activities-details/activities-details.component';
import { ActivitiesListComponent } from './activity/activities-list/activities-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {DataTablesModule} from "angular-datatables";
import { BeneficiariesListComponent } from './beneficiary/beneficiaries-list/beneficiaries-list.component';
import { AddBeneficiaryComponent } from './beneficiary/add-beneficiary/add-beneficiary.component';
import { BeneficiaryDetailsComponent } from './beneficiary/beneficiary-details/beneficiary-details.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AddDocumentComponent } from './document/add-document/add-document.component';
import { DocumentsListComponent } from './document/documents-list/documents-list.component';
import { DocumentsDetailsComponent } from './document/documents-details/documents-details.component';
import { TutorialsListComponent } from './tutorial/tutorials-list/tutorials-list.component';
import { AddDossierComponent } from './dossier/add-dossier/add-dossier.component';
import { DossiersListComponent } from './dossier/dossiers-list/dossiers-list.component';
import { DossiersDetailsComponent } from './dossier/dossiers-details/dossiers-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AddActivityComponent,
    ActivitiesDetailsComponent,
    ActivitiesListComponent,
    BeneficiariesListComponent,
    AddBeneficiaryComponent,
    BeneficiaryDetailsComponent,
    UploadImagesComponent,
    AddDocumentComponent,
    DocumentsListComponent,
    DocumentsDetailsComponent,
    TutorialsListComponent,
    AddDossierComponent,
    DossiersListComponent,
    DossiersDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    DataTablesModule,
    NoopAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule
  ],
  exports: [

  BrowserAnimationsModule
],
  providers: [authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
