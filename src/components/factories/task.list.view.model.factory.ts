import { Inject, Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { TaskListViewModel } from "../../viewmodels/task.list.view.model";
import { TaskRepository } from "../../data/repositories/task.repository";
import { PageViewModelFactory } from "./page.view.model.factory";
import { IFactory } from "../interfaces/i.factory";
import { TaskViewModel } from "../../viewmodels/task.view.model";
import { TaskViewModelFactory } from "../../viewmodels/task.view.model.factory";
import { ProjectRepository } from "../../data/repositories/project.repository";

@Injectable()
export class TaskListViewModelFactory extends AbstractFactory<TaskListViewModel>
{

    
    constructor(tRepo: TaskRepository, pageVm: PageViewModelFactory, @Inject(TaskViewModelFactory) taskVmFactory: IFactory<TaskViewModel>, projectRepo: ProjectRepository) 
    {
        super(() => new TaskListViewModel(projectRepo, tRepo, pageVm, taskVmFactory));
        
    }
    
}
