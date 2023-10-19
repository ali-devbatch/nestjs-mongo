import { Model } from 'mongoose';
import { UserDocument } from 'src/auth/entities/user.entity';
import { PaginationService } from 'src/pagination/pagination.service';
export declare class UserService {
    private userModel;
    private readonly paginationService;
    constructor(userModel: Model<UserDocument>, paginationService: PaginationService);
    userPosts(userId: string, queryParams: any): Promise<{
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
