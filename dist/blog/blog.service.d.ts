import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { BlogDocument } from './entities/blog.entity';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth/entities/user.entity';
export declare class BlogService {
    private readonly paginationService;
    private blogModel;
    private userModel;
    constructor(paginationService: PaginationService, blogModel: Model<BlogDocument>, userModel: Model<UserDocument>);
    create(createBlogDto: CreateBlogDto, userId: string): Promise<{
        data: any;
        status: number;
        message: string;
    }>;
    findAll(queryParams: any): Promise<{
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
    findOne(id: string): Promise<{
        data: any;
        status: number;
        message: string;
    }>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<{
        data: any;
        status: number;
        message: string;
    }>;
    remove(id: string): Promise<{
        data: any;
        status: number;
        message: string;
    }>;
}
