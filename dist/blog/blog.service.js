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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../pagination/pagination.service");
const mongoose_1 = require("@nestjs/mongoose");
const blog_entity_1 = require("./entities/blog.entity");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../auth/entities/user.entity");
let BlogService = class BlogService {
    constructor(paginationService, blogModel, userModel) {
        this.paginationService = paginationService;
        this.blogModel = blogModel;
        this.userModel = userModel;
    }
    async create(createBlogDto) {
        try {
            const data = new this.blogModel();
            data.title = createBlogDto.blogTitle;
            data.description = createBlogDto.blogDescription;
            await data.save();
            return { data: data, status: 200, message: 'blog created successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'blog not created' };
        }
    }
    async findAll(queryParams) {
        const queryBuilder = this.blogModel.find();
        return this.paginationService.paginate(queryBuilder, queryParams);
    }
    async findOne(id) {
        try {
            const data = await this.blogModel.findById(id);
            if (!data) {
                return {
                    data: data,
                    status: 404,
                    message: 'there is no registered post',
                };
            }
            return { data: data, status: 200, message: 'blog found successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'blog not found' };
        }
    }
    async update(id, updateBlogDto) {
        try {
            const data = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
                new: true,
            });
            if (!data) {
                return { data: '', status: 404, message: 'blog not found' };
            }
            return { data: data, status: 200, message: 'blog updated successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'blog not updated' };
        }
    }
    async remove(id) {
        try {
            const data = await this.blogModel.findByIdAndDelete(id);
            if (data) {
                return {
                    data: data,
                    status: 200,
                    message: 'user deleted successfully',
                };
            }
            return { data: data, status: 404, message: 'blog not found' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'blog not deleted' };
        }
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(blog_entity_1.Blog.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [pagination_service_1.PaginationService,
        mongoose_2.Model,
        mongoose_2.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map