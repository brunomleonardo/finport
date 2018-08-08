export class ResponseDto<T> {
    Status: Boolean;
    Message: string;
    AccessToken: string;
    Data?: T;
    DataList?: T[];
}
