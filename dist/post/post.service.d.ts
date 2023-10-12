import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { PostDocument } from './entities/post.entity';
import { PaginationService } from 'src/pagination/pagination.service';
export declare class PostService {
    private readonly paginationService;
    private postModel;
    constructor(paginationService: PaginationService, postModel: Model<PostDocument>);
    create(createPostDto: CreatePostDto): Promise<{
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
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
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
