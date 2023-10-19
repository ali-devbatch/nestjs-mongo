import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: any, queryParams: any): Promise<{
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
    } | {
        status: number;
        message: string;
        error?: undefined;
    } | {
        status: number;
        message: string;
        error: any;
    }>;
}
