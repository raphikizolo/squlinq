import { ResultOrError } from "../components/result.or.error";
import { ErrorResponse } from "../data/models/error.response";

export abstract class ViewBase
{

    protected roe<T extends object, R>(r: T)
    {
        let re = new ResultOrError<T, R>(r)
        re.error.subscribe(e => this.onError(e))
        return re.result

    }


    protected onError(e: ErrorResponse)
    {
        console.log(`${JSON.stringify(e)}`);
        
    }
}