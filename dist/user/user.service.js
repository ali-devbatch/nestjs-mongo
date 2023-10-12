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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.userModel.findOne({
                email: createUserDto.email,
            });
            if (existingUser) {
                return { data: null, status: 400, message: 'Email is already in use' };
            }
            const newUser = new this.userModel(createUserDto);
            const data = await newUser.save();
            return { data, status: 201, message: 'User created successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'User not created' };
        }
    }
    async findAll() {
        try {
            const data = await this.userModel.find();
            if (!data) {
                return {
                    data: data,
                    status: 404,
                    message: 'there is no registered user',
                };
            }
            return { data: data, status: 200, message: 'users found successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'users not found' };
        }
    }
    async findOne(id) {
        try {
            const data = await this.userModel.findById(id);
            if (!data) {
                return {
                    data: data,
                    status: 404,
                    message: 'there is no registered user',
                };
            }
            return { data: data, status: 200, message: 'users found successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'user not found' };
        }
    }
    async update(id, updateUserDto) {
        try {
            const data = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
                new: true,
            });
            if (!data) {
                return { data: '', status: 404, message: 'user not found' };
            }
            return { data: data, status: 200, message: 'user updated successfully' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'user not updated' };
        }
    }
    async remove(id) {
        try {
            const data = await this.userModel.findByIdAndDelete(id);
            if (data) {
                return {
                    data: data,
                    status: 200,
                    message: 'user deleted successfully',
                };
            }
            return { data: data, status: 404, message: 'user not found' };
        }
        catch (error) {
            return { data: error.message, status: 500, message: 'user not deleted' };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map