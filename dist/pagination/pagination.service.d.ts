export declare class PaginationService {
    paginate(resultData: any, options: any): Promise<{
        data: any[];
        status: number;
        message: string;
        pagination?: undefined;
    } | {
        data: any[];
        status: number;
        message: string;
        pagination: {
            total: number;
            limit: any;
            page: any;
            totalPages: number;
            hasPrevPage: boolean;
            hasNextPage: boolean;
        };
    }>;
}
