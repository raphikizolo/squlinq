import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { StudentViewModel } from "../../viewmodels/student.view.model";
import { StudentRepository } from "../../data/repositories/student.repository";
import { PersonRepository } from "../../data/repositories/person.repository";

@Injectable()
export class StudentViewModelFactory extends AbstractFactory<StudentViewModel>
{

    /**
     *
     */
    constructor(repo: StudentRepository, personRepo: PersonRepository) 
    {
        super(() => new StudentViewModel(repo, personRepo));
        
    }
}