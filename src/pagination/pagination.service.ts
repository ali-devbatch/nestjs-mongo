import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate(queryBuilder, options) {
    const { page = 1, limit = 10, sort } = options;

    const skip = (page - 1) * limit;

    // Create a sorting object based on the 'sort' parameter
    const sorting = {};

    if (sort) {
      // Split the 'sort' parameter by commas to handle multiple sorting criteria
      const sortFields = sort.split(',');

      // Parse each sorting criterion
      sortFields.forEach((sortField) => {
        // Split the criterion into field and order (e.g., "field:asc")
        const [field, order] = sortField.split(':');

        // Set the sorting direction (asc or desc) for the field
        sorting[field] = order === 'desc' ? -1 : 1;
      });

      // Apply sorting to the query builder
      queryBuilder.sort(sorting);
    }

    // Calculate the total count (for metadata)
    const totalCountPromise = queryBuilder.clone().count().exec();

    // Execute the query with pagination
    const resultsPromise = queryBuilder.skip(skip).limit(limit).exec();

    return Promise.all([totalCountPromise, resultsPromise]).then(
      ([count, results]) => {
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
      },
    );
  }
}
