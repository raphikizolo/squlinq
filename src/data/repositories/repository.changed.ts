import { Streams } from "../../components/streams";
import { Entity } from "../models/entity";

export type Source = "project" | "person" | "task";

export class RepositoryChange<T extends Entity<T>>
{

    sources: Source[] = [];
    
    added: T[] = [];
    
    removed: T[] = [];

    updated: T[] = [];

    constructor(sources: Source[])
    {
        this.sources.push(...sources);
    }


    getIfUpdated(t: T): T | undefined
    {
        return Streams.tryFirst(this.updated || [], e => e.id == t.id);
    }


    isDeleted(t: T): boolean
    {
        return Streams.any(this.removed || [], e => e.id == t.id);
    }


    inChangeHierarchy(name: Source): boolean
    {
        return Streams.any(this.sources.slice(0, this.sources.length - 1), s => s == name);
        
    }


}