import { Subject } from "rxjs";

export class DialogViewModel
{
    
    title = 'Dialog';

    data: any | undefined = undefined;

    ok = new Subject<any | undefined>();

    cancel = new Subject<any | undefined>();
    
    message: string = ''



    onOk(): void 
    {
        this.ok.next(this.data);
    }

}