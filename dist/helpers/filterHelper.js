"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterHelper {
    tickets(query, filters) {
        if (filters.query_status) {
            query.query_status = filters.query_status;
        }
        if (filters.search_string && filters.search_string.trim()) {
            const searchPattern = new RegExp(filters.search_string.trim().replace(/\s/, "|"), "ig");
            query.$or = [
                { ticket_id: searchPattern },
                { requester: searchPattern }
            ];
        }
        query.status = { $ne: "INACTIVE" };
        return query;
    }
}
exports.default = new FilterHelper();
