import { Injectable } from "@angular/core";
import { IOutputService } from "./interfaces/i.output.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppJournalEntriesViewModel, AppJournalEntry } from "../viewmodels/app.journal.view.model";
import { DefaultTimeFormat } from "../pipes/dd.mm.yy.am.pm";



@Injectable()
export class AppJournalService
{

    
    constructor(private vm: AppJournalEntriesViewModel, private defaultTimeFormat: DefaultTimeFormat)
    {

    }

    entry(title: string, entry: string): void 
    {
        this.vm.addEntry({ time: this.defaultTimeFormat.transform(new Date()), title: title, entry: entry });
    }



    
}