

export class API_CONSTANTS {
    public static API_ENDPOINT = 'https://localhost:5001/api';
    public static API_FIND_TICKER = API_CONSTANTS.API_ENDPOINT + '/tickers/byabbv';
    public static API_LOAD_TICKERS = API_CONSTANTS.API_ENDPOINT + '/tickers/loadtickers';
    public static API_ADD_TICKER = API_CONSTANTS.API_ENDPOINT + '/useroperations/addoperation';
    public static API_SIGN_IN = API_CONSTANTS.API_ENDPOINT + '/users/signin';
    public static API_SIGN_UP = API_CONSTANTS.API_ENDPOINT + '/users/signup';
    public static API_LOAD_WALLET = API_CONSTANTS.API_ENDPOINT + '/wallet/getwallet';
}




