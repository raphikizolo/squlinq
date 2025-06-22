import { Observable } from "rxjs";
import { Entity } from "./entity";
import { Project } from "./project";
import { ApiProperty } from "../decorators/api";
import { TaskStatus } from "../../viewmodels/task.list.view.model";
import { CollectionModel } from "./collection.model";
import { TaskAction } from "./task.action";
import { Comment } from "./comment";
import { Reminder } from "./reminder";

export class Task extends Entity<Task>
{
    static CLASS_NAME = 'Task'

    @ApiProperty
    name!: string

    @ApiProperty
    optimisticDuration!: number

    project!: Observable<Project>

    taskActions?: Observable<CollectionModel<TaskAction>>;
    
    comments?: Observable<CollectionModel<Comment>>;
    
    reminders?: Observable<CollectionModel<Reminder>>;

    @ApiProperty
    description!: string;

    @ApiProperty
    normalDuration!: number;

    @ApiProperty
    pessimisticDuration!: number;

    @ApiProperty
    status!: TaskStatus


}