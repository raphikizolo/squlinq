// import { Inject, Injectable } from "@angular/core";
// import { AbstractFactory } from "../components/factories/abstract.factory";
// import { TaskViewModel } from "./task.view.model";
// import { ReminderViewModelFactory } from "../components/factories/reminder.view.model.factory";
// import { IFactory } from "../components/interfaces/i.factory";
// import { ReminderViewModel } from "./reminder.view.model";


// @Injectable()
// export class TaskViewModelFactory extends AbstractFactory<TaskViewModel>
// {
//     /**
//      *
//      */
//     constructor(@Inject(ReminderViewModelFactory) private reminderVmFactory: IFactory<ReminderViewModel>) 
//     {
//         super(() => new TaskViewModel(reminderVmFactory));
        
//     }
// }