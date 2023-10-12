export declare class PaginationService {
    paginate(queryBuilder: any, options: any): Promise<{
        data: any;
        pagination: {
            total: any;
            limit: any;
            page: any;
            totalPages: number;
            hasPrevPage: boolean;
            hasNextPage: boolean;
        };
    }>;
}
