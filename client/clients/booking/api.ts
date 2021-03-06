/* tslint:disable */
/* eslint-disable */
/**
 * booking
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface AddBookingDTO
 */
export interface AddBookingDTO {
    /**
     * 
     * @type {string}
     * @memberof AddBookingDTO
     */
    start?: string;
    /**
     * 
     * @type {string}
     * @memberof AddBookingDTO
     */
    end?: string;
    /**
     * 
     * @type {string}
     * @memberof AddBookingDTO
     */
    userName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AddBookingDTO
     */
    roomId?: string;
}
/**
 * 
 * @export
 * @interface Booking
 */
export interface Booking {
    /**
     * 
     * @type {string}
     * @memberof Booking
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Booking
     */
    start?: string;
    /**
     * 
     * @type {string}
     * @memberof Booking
     */
    end?: string;
    /**
     * 
     * @type {string}
     * @memberof Booking
     */
    roomId?: string;
    /**
     * 
     * @type {string}
     * @memberof Booking
     */
    userName?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Booking
     */
    duration?: number;
}
/**
 * 
 * @export
 * @interface ProblemDetails
 */
export interface ProblemDetails {
    [key: string]: any | any;

    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProblemDetails
     */
    status?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    detail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    instance?: string | null;
}
/**
 * 
 * @export
 * @interface Room
 */
export interface Room {
    /**
     * 
     * @type {string}
     * @memberof Room
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Room
     */
    name?: string | null;
}

/**
 * BookingApi - axios parameter creator
 * @export
 */
export const BookingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {AddBookingDTO} [addBookingDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiBookingAddPost: async (addBookingDTO?: AddBookingDTO, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Booking/add`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(addBookingDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [roomId] 
         * @param {string} [date] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiBookingGet: async (roomId?: string, date?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Booking`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (roomId !== undefined) {
                localVarQueryParameter['roomId'] = roomId;
            }

            if (date !== undefined) {
                localVarQueryParameter['date'] = (date as any instanceof Date) ?
                    (date as any).toISOString() :
                    date;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [bookingId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiBookingRemovePost: async (bookingId?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Booking/remove`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (bookingId !== undefined) {
                localVarQueryParameter['bookingId'] = bookingId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BookingApi - functional programming interface
 * @export
 */
export const BookingApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BookingApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {AddBookingDTO} [addBookingDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiBookingAddPost(addBookingDTO?: AddBookingDTO, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiBookingAddPost(addBookingDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [roomId] 
         * @param {string} [date] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiBookingGet(roomId?: string, date?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Booking>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiBookingGet(roomId, date, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [bookingId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiBookingRemovePost(bookingId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiBookingRemovePost(bookingId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * BookingApi - factory interface
 * @export
 */
export const BookingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BookingApiFp(configuration)
    return {
        /**
         * 
         * @param {AddBookingDTO} [addBookingDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiBookingAddPost(addBookingDTO?: AddBookingDTO, options?: any): AxiosPromise<void> {
            return localVarFp.apiBookingAddPost(addBookingDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [roomId] 
         * @param {string} [date] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiBookingGet(roomId?: string, date?: string, options?: any): AxiosPromise<Array<Booking>> {
            return localVarFp.apiBookingGet(roomId, date, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [bookingId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiBookingRemovePost(bookingId?: string, options?: any): AxiosPromise<void> {
            return localVarFp.apiBookingRemovePost(bookingId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BookingApi - object-oriented interface
 * @export
 * @class BookingApi
 * @extends {BaseAPI}
 */
export class BookingApi extends BaseAPI {
    /**
     * 
     * @param {AddBookingDTO} [addBookingDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookingApi
     */
    public apiBookingAddPost(addBookingDTO?: AddBookingDTO, options?: any) {
        return BookingApiFp(this.configuration).apiBookingAddPost(addBookingDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [roomId] 
     * @param {string} [date] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookingApi
     */
    public apiBookingGet(roomId?: string, date?: string, options?: any) {
        return BookingApiFp(this.configuration).apiBookingGet(roomId, date, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [bookingId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookingApi
     */
    public apiBookingRemovePost(bookingId?: string, options?: any) {
        return BookingApiFp(this.configuration).apiBookingRemovePost(bookingId, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * RoomApi - axios parameter creator
 * @export
 */
export const RoomApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRoomGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Room`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRoomIdGet: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('apiRoomIdGet', 'id', id)
            const localVarPath = `/api/Room/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RoomApi - functional programming interface
 * @export
 */
export const RoomApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RoomApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiRoomGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Room>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiRoomGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiRoomIdGet(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Room>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiRoomIdGet(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RoomApi - factory interface
 * @export
 */
export const RoomApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RoomApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRoomGet(options?: any): AxiosPromise<Array<Room>> {
            return localVarFp.apiRoomGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRoomIdGet(id: string, options?: any): AxiosPromise<Room> {
            return localVarFp.apiRoomIdGet(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RoomApi - object-oriented interface
 * @export
 * @class RoomApi
 * @extends {BaseAPI}
 */
export class RoomApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomApi
     */
    public apiRoomGet(options?: any) {
        return RoomApiFp(this.configuration).apiRoomGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomApi
     */
    public apiRoomIdGet(id: string, options?: any) {
        return RoomApiFp(this.configuration).apiRoomIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
}


