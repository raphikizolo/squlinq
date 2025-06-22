import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../viewmodels/task.list.view.model';

@Pipe({
    name: 'statusToStyle',
    standalone: false
})

export class TaskStatusToStylePipe implements PipeTransform 
{
    private iconColors = new Map<TaskStatus, { color: string }>([
        ['todo', { color: 'red'}],
        ['work_in_progress', { color: 'orange'}],
        ['finished', { color: 'green'}]

    ])

    transform(value: any, ...args: any[]): any 
    {
        if(!value || !args) return undefined
        if(args)
        {
            let prop = args[0] as string
            let data = prop.split('-')
            if(data[0] == 'icon' && data[1] == 'color')
            {
                return this.iconColors.get(value as TaskStatus)

            }



        }

        
    }
}