/* 
 Copyright 2020-2021 404 Solutions Company
*/

export class Alert {
    type: AlertType;
    message: string;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}