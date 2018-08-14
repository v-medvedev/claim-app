import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatFormFieldModule, MatDividerModule, MAT_DATE_LOCALE } from '@angular/material';

import { AppComponent } from './app.component';
import { PdClaimsComponent } from './pd-claims/pd-claims.component';
import { RoyalMailCreditsComponent } from './royal-mail-credits/royal-mail-credits.component';
import { FedexCreditsComponent } from './fedex-credits/fedex-credits.component';
import { DhlCreditsComponent } from './dhl-credits/dhl-credits.component';
import { WnDirectCreditsComponent } from './wn-direct-credits/wn-direct-credits.component';
import { HermesCreditsComponent } from './hermes-credits/hermes-credits.component';
import { FastwayCreditsComponent } from './fastway-credits/fastway-credits.component';
import { ReportComponent } from './report/report.component';

import { KeysComponent } from './keys/keys.component';
import { EditClaimComponent } from './edit-claim/edit-claim.component';
import { AddClaimComponent } from './add-claim/add-claim.component';
import { ConfirmRemoveComponent } from './confirm-remove/confirm-remove.component';
import { CreditComponent } from './credit/credit.component';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { EditCreditComponent } from './edit-credit/edit-credit.component';

import { CreditResolver } from './credit-resolver';
import { ClaimResolver } from './claim-resolver';

import { NgxChartsModule } from '@swimlane/ngx-charts';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pd-claims' },
  { path: 'pd-claims', component: PdClaimsComponent, resolve: { claims: ClaimResolver }  },
  { path: 'royal-mail-credits', component: RoyalMailCreditsComponent, resolve: { credits: CreditResolver } },
  { path: 'fedex-credits', component: FedexCreditsComponent, resolve: { credits: CreditResolver } },
  { path: 'dhl-credits', component: DhlCreditsComponent, resolve: { credits: CreditResolver } },
  { path: 'wn-direct-credits', component: WnDirectCreditsComponent, resolve: { credits: CreditResolver } },
  { path: 'hermes-credits', component: HermesCreditsComponent, resolve: { credits: CreditResolver } },
  { path: 'fastway-credits', component: FastwayCreditsComponent, resolve: { credits: CreditResolver } },
  { path: 'report', component: ReportComponent, resolve: { credits: CreditResolver, claims: ClaimResolver } },
  { path: 'colour-keys', component: KeysComponent },
  { path: '**', redirectTo: 'pd-claims' }
];

@NgModule({
  declarations: [
    AppComponent,
    PdClaimsComponent,
    RoyalMailCreditsComponent,
    FedexCreditsComponent,
    DhlCreditsComponent,
    WnDirectCreditsComponent,
    HermesCreditsComponent,
    FastwayCreditsComponent,
    ReportComponent,
    KeysComponent,
    EditClaimComponent,
    AddClaimComponent,
    ConfirmRemoveComponent,
    CreditComponent,
    AddCreditComponent,
    EditCreditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTabsModule,
    MatDividerModule,
    NgxChartsModule
  ],
  entryComponents: [
    AddClaimComponent,
    EditClaimComponent,
    ConfirmRemoveComponent,
    AddCreditComponent,
    EditCreditComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
