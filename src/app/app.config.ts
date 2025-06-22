import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideRouter, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { REPOSITORY_META } from '../data/repositories/abstract.repository';
import { ApiMeta } from '../data/meta/api.meta';
import { DefaultTimeFormat } from '../pipes/dd.mm.yy.am.pm';
import { RandomService } from '../components/random.service';
import { MainViewTabHeaderViewModel } from '../viewmodels/main.view.tab.header.view.model';
import { MainViewTabHeaderViewModelFactory } from '../components/factories/main.view.tab.header.view.model.factory';
import { StudentViewModelFactory } from '../components/factories/student.view.model.factory';
import { StudentRepository } from '../data/repositories/student.repository';
import { PersonRepository } from '../data/repositories/person.repository';
import { Api } from '../components/api';
import { HeaderService } from '../data/interceptors/header.service';
import { TableHeaderViewModelFactory } from '../components/factories/table.header.view.model.factory';
import { TableHeadersViewModelFactory } from '../components/factories/table.headers.view.model.factory';
import { HourMinute } from '../pipes/hour.minute';
import { TermViewModelFactory } from '../components/factories/term.view.model.factory';
import { FeeAccountViewModelFactory } from '../components/factories/fee.account.view.model.factory';
import { StudentFeePaymentViewModelFactory } from '../components/factories/student.fee.payment.factory';
import { DefaultDateFormat } from '../pipes/dd.mm.yy';
import { GradeRepository } from '../data/repositories/grade.repository';
import { FeeAccountRepository } from '../data/repositories/fee.account.repository';
import { AccountRepository } from '../data/repositories/account.repository';
import { FeeStructureVoteheadRepository } from '../data/repositories/fee.structure.votehead.repository';
import { AccountEntryRepository } from '../data/repositories/account.entry.repository';
import { BookkeepingActionRepository } from '../data/repositories/bookkeeping.action.repository';
import { TransactionRepository } from '../data/repositories/transaction.repository';
import { AccountRepositoryProvider } from '../components/providers/account.repository.provider';
import { FeeStructureRepository } from '../data/repositories/fee.structure.repository';
import { TermRepository } from '../data/repositories/term.repository';
import { TermRepositoryProvider } from '../components/providers/term.repository.provider';
import { GradeRepositoryProvider } from '../components/providers/grade.repository.provider';
import { AbstractConverter } from '../components/converters/abstract.converter';
import { ISODateConverter } from '../components/converters/iso.date.converter';
import { AppInitialization } from '../components/app.initialization';
import { VoteheadPaymentViewModelFactory } from '../components/factories/votehead.payment.view.model.factory';
import { StudentFeeStatementViewModelFactory } from '../components/factories/student.fee.statement.factory';
import { AccountEntryViewModelFactory } from '../components/factories/account.entry.view.model.factory';
import { VoteheadStatementViewModelFactory } from '../components/factories/votehead.statement.view.model.factory';
import { AccountEntryRepositoryProvider } from '../components/providers/account.entry.repository.provider';
import { FeeAccountStatementViewModelFactory } from '../components/factories/fee.account.statetment.view.model.factory';

export const appConfig: ApplicationConfig = {

  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: REPOSITORY_META, useValue: ApiMeta.getInstance() },
    { provide: RandomService },
    { provide: MainViewTabHeaderViewModelFactory },
    { provide: StudentViewModelFactory },
    { provide: StudentRepository },
    { provide: PersonRepository },
    { provide: Api },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderService, multi: true },
    { provide: TableHeaderViewModelFactory },
    { provide: TableHeadersViewModelFactory },
    { provide: DefaultTimeFormat },
    { provide: DefaultDateFormat },
    { provide: HourMinute },
    { provide: TermViewModelFactory },
    { provide: FeeAccountViewModelFactory },
    { provide: StudentFeePaymentViewModelFactory },
    { provide: GradeRepository },
    { provide: FeeAccountRepository },
    { provide: AccountRepository },
    { provide: FeeStructureVoteheadRepository },
    { provide: AccountEntryRepository },
    { provide: BookkeepingActionRepository },
    { provide: TransactionRepository },
    { provide: AccountRepositoryProvider },
    { provide: FeeStructureRepository },
    { provide: TermRepository },
    { provide: TermRepositoryProvider },
    { provide: GradeRepositoryProvider },
    { provide: ISODateConverter },
    { provide: AbstractConverter.CONVERTERS, useExisting: ISODateConverter, multi: true },
    { provide: AppInitialization },
    provideAppInitializer(() => inject(AppInitialization).initialize()),
    { provide: VoteheadPaymentViewModelFactory },
    { provide: StudentFeeStatementViewModelFactory },
    { provide: AccountEntryViewModelFactory },
    { provide: VoteheadStatementViewModelFactory },
    { provide: AccountEntryRepositoryProvider }, 
    { provide: FeeAccountStatementViewModelFactory }

  
  
  ]

};

export const ANGULAR_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule


]

export const COMMON_MODULES = [
  // CommonModule,
  // BrowserModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatButtonModule,
  MatIconModule,           
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatListModule,
  FlexLayoutModule,
  MatBadgeModule,
  MatProgressBarModule,
  MatTooltipModule,
]
