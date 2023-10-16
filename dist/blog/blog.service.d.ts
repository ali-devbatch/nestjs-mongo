import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { BlogDocument } from './entities/blog.entity';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entities/user.entity';
export declare class BlogService {
    private readonly paginationService;
    private blogModel;
    private userModel;
    constructor(paginationService: PaginationService, blogModel: Model<BlogDocument>, userModel: Model<UserDocument>);
    create(createBlogDto: CreateBlogDto): Promise<{
        data: any;
        status: number;
        message: string;
    }>;
    findAll(queryParams: any): Promise<{
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
