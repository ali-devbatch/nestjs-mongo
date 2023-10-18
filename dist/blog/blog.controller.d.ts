import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto, req: any): Promise<{
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
