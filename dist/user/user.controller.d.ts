import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
