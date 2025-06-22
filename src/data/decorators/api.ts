import { Type } from "@angular/core";
import { ApiMeta } from "../meta/api.meta";

export function ApiProperty(target: Object, propertyKey: string)
{
    ApiMeta.getInstance().addApiProperty(target.constructor.name, propertyKey);

}


export function Converter(converterCtor: any)
{
    return function converter(target: Object, propertyKey: string)
    {
        // const { ApiMeta } = require("../meta/api.meta");
        ApiMeta.getInstance().addConverter(target.constructor.name, propertyKey, converterCtor)

    }
}


export function ApiLinkProperty(target: Object, propertyKey: string)
{
    // const { ApiMeta } = require("../meta/api.meta");
    ApiMeta.getInstance().registerApiLinkProperty(target.constructor.name, propertyKey);

}


export function EntityObservableProperty(linkPropertyName: string, optional=false)
{
    return  function _entityObservableProperty(target: Object, observableBuilder: string)
    {
        //property name.
        //repoclass => entity_link_property_name, observable_builder.
        // const { ApiMeta } = require("../meta/api.meta");
        ApiMeta.getInstance().addApiLinkProperty(target.constructor.name, linkPropertyName, observableBuilder, optional);
    }

}

export function Repository(entity: any)
{
    return function repository(ctor: Function)
    {
        // const { ApiMeta } = require("../meta/api.meta");
        ApiMeta.getInstance().addRepository(entity, ctor)

    }
}

