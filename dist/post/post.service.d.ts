import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { PostDocument } from './entities/post.entity';
export declare class PostService {
    private postModel;
    constructor(postModel: Model<PostDocument>);
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
