import { Pipe, PipeTransform } from "@angular/core";
import { TaskStatus } from "../viewmodels/task.list.view.model";

@Pipe({
    name: 'statusToSentence',
    standalone: false
})
export class TaskStatusToSentensePipe implements PipeTransform
{


    transform(value: TaskStatus | undefined, ...args: any[]) 
    {
        if(!value) return ''
        let st: TaskStatus = value
        if(st == 'todo') return 'To Do'
        if(st == 'work_in_progress') return 'In Progress'
        if(st == 'finished') return 'Finished'
        else throw Error(`Cant tranform task status ${value} to a sentence version.`)


        
    }
    
}