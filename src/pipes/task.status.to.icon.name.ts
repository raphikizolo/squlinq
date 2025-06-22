import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../viewmodels/task.list.view.model';

@Pipe({
    name: 'statusToIconName',
    standalone: false
})

export class TaskStatusToIconNamePipe implements PipeTransform 
{
    private statusIconMap = new Map<TaskStatus, string>([
        ["todo", 'checklist'],
        ['work_in_progress', 'hourglass_empty'],
        ['finished', 'check_circle']
    ])

    transform(value: TaskStatus | undefined, ...args: any[]): any 
    {
        if(value)
        {
            let v: TaskStatus = value as TaskStatus
            return this.statusIconMap.get(v)
        }
        
    }
}