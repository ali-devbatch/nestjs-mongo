import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto): Promise<{
        data: any;
        status: number;
        message: string;
    }>;
    findAll(): Promise<{
        data: any;
        status: number;
        message: string;
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
