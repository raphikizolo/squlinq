import { IPage } from "./page";

export interface PageModel<T>
{
    page: IPage;
    entities: T[];
    self: string;
    previous?: string;
    next?: string;

}