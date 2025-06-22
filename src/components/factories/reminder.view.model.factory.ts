import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { ReminderViewModel } from "../../viewmodels/reminder.view.model";

@Injectable()
export class ReminderViewModelFactory extends AbstractFactory<ReminderViewModel>
{

    /**
     *
     */
    constructor() 
    {
        super(() => new ReminderViewModel());
        
    }

}