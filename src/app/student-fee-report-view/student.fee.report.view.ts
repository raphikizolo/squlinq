import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'student-fee-report-view',
    templateUrl: 'student.fee.report.view.html',
    imports: [RouterModule],
    standalone: true
})

export class StudentFeeReportView implements OnInit 
{

    id: string = ''


    constructor(route: ActivatedRoute) 
    {
        route.params.subscribe(p => this.id = p['id'])

    }

    ngOnInit() { }
}