import { Injectable } from "@angular/core";
import { BiMap } from "./bimap";


@Injectable()
export class UrlService
{

    private endpointMap = new BiMap<string, number>();

    private nextInterim = 1;

    interimEndpoint(endpoint: string)
    {
        return this.endpointMap.computeIfAbsent(endpoint, (k: string) => this.nextInterim++);

    }

    getEndpoint(interimEndpoint: string | number)
    {
        return this.endpointMap.getKey(typeof interimEndpoint == 'number' ? interimEndpoint : Number.parseInt(interimEndpoint));
    }
}