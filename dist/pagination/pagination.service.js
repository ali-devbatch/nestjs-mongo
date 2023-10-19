"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
let PaginationService = class PaginationService {
    async paginate(resultData, options) {
        const { page = 1, limit = 10, sort } = options;
        const skip = (page - 1) * limit;
        const clonedResultData = [...resultData];
        if (sort) {
            const sorting = {};
            const sortFields = sort.split(',');
            sortFields.forEach((sortField) => {
                const [field, order] = sortField.split(':');
                sorting[field] = order === 'desc' ? -1 : 1;
            });
            clonedResultData.sort((a, b) => {
                for (const field of Object.keys(sorting)) {
                    const sortOrder = sorting[field];
                    if (a[field] < b[field])
                        return -1 * sortOrder;
                    if (a[field] > b[field])
                        return 1 * sortOrder;
                }
                return 0;
            });
        }
        const total = clonedResultData.length;
        const data = clonedResultData.slice(skip, skip + limit);
        const totalPages = Math.ceil(total / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        if (data.length === 0) {
            return {
                data: [],
                status: 404,
                message: 'no data found',
            };
        }
        return {
            data: data,
            status: 200,
            message: 'data found',
            pagination: {
                total,
                limit,
                page,
                totalPages,
                hasPrevPage,
                hasNextPage,
            },
        };
    }
};
exports.PaginationService = PaginationService;
exports.PaginationService = PaginationService = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
//# sourceMappingURL=pagination.service.js.map