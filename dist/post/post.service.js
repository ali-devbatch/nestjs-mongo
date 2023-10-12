"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_entity_1 = require("./entities/post.entity");
let PostService = class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(createPostDto) {
        try {
            const data = new this.postModel();
            data.title = createPostDto.title;
            data.description = createPostDto.description;
            await data.save();
            return { data: data, status: 200, message: 'post created successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'post not created' };
        }
    }
    async findAll() {
        try {
            const data = await this.postModel.find();
            if (!data) {
                return {
                    data: data,
                    status: 404,
                    message: 'there is no registered post',
                };
            }
            return { data: data, status: 200, message: 'posts found successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'post not found' };
        }
    }
    async findOne(id) {
        try {
            const data = await this.postModel.findById(id);
            if (!data) {
                return {
                    data: data,
                    status: 404,
                    message: 'there is no registered post',
                };
            }
            return { data: data, status: 200, message: 'posts found successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'post not found' };
        }
    }
    async update(id, updatePostDto) {
        try {
            const data = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
                new: true,
            });
            if (!data) {
                return { data: '', status: 404, message: 'post not found' };
            }
            return { data: data, status: 200, message: 'post updated successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'post not updated' };
        }
    }
    async remove(id) {
        try {
            const data = await this.postModel.findByIdAndDelete(id);
            if (data) {
                return {
                    data: data,
                    status: 200,
                    message: 'user deleted successfully',
                };
            }
            return { data: data, status: 404, message: 'post not found' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'post not deleted' };
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_entity_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostService);
//# sourceMappingURL=post.service.js.map