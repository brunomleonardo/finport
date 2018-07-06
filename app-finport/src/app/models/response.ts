export class ResponseDto<T> {
    status: Boolean;
    message: string;
    accessToken: string;
    data?: T;
    dataList?: T[];
}
