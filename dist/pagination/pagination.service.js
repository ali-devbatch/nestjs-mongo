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
    paginate(queryBuilder, options) {
        const { page = 1, limit = 10, sort } = options;
        const skip = (page - 1) * limit;
        const sorting = {};
        if (sort) {
            const sortFields = sort.split(',');
            sortFields.forEach((sortField) => {
                const [field, order] = sortField.split(':');
                sorting[field] = order === 'desc' ? -1 : 1;
            });
            queryBuilder.sort(sorting);
        }
        const totalCountPromise = queryBuilder.clone().count().exec();
        const resultsPromise = queryBuilder.skip(skip).limit(limit).exec();
        return Promise.all([totalCountPromise, resultsPromise]).then(([count, results]) => {
            const total = count;
            const totalPages = Math.ceil(total / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            return {
                data: results,
                pagination: {
                    total,
                    limit,
                    page,
                    totalPages,
                    hasPrevPage,
                    hasNextPage,
                },
            };
        });
    }
};
exports.PaginationService = PaginationService;
exports.PaginationService = PaginationService = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
//# sourceMappingURL=pagination.service.js.map