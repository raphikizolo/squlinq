import { Routes } from '@angular/router';
import { MainView } from './main-view/main.view';
import { DashboardView } from './dashboard-view/dashboard.view';
import { AddNewStudentView } from './add-new-student-view/add.new.student.view';
import { StudentListView } from '../student-list-view/student.list.view';
import { StudentFeeReportView } from './student-fee-report-view/student.fee.report.view';
import { StudentFeePaymentView } from './student-fee-payment-view/student.fee.payment.view';
import { StudentFeeStatementViewModel } from '../viewmodels/student.fee.statement.view.model';
import { StudentFeeStatementView } from './student-fee-statement-view /student.fee.statement.view';
import { AddNewFeeAccountView } from './add-fee-account-view/add.fee.account.view';

export const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    { path: 'app', children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: DashboardView },
        { path: 'add-student', component: AddNewStudentView },
        { path: 'student-list', component: StudentListView },
        { path: 'student-fee-payment/:id', component: StudentFeePaymentView },
        { path: 'student-fee-statement/:id', component: StudentFeeStatementView },
        { path: 'add-fee-account/:id', component: AddNewFeeAccountView }

    ] },

];
