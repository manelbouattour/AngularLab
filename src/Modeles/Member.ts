import { Evt } from "./Evt";

export interface Member{ //export pour qu'on puisse exporter ailleurs
    idMember:string,
    cin:string,
    name:string,
    type:string,
    createdDate:string,
    tab_evt:Evt[]
}