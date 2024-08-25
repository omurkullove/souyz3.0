import { IPaginatedResponse } from './main-types';

export interface INews {
    title: string;
    url: string;
    link: string;
    uuid: string;
    created_time: string;
}

export interface INewsResponse extends IPaginatedResponse<INews> {}
