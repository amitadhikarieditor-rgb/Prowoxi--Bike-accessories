export function pagination(q) {
    const page = Math.max(1, Number(q.page) || 1);

    const limit = Math.min(
        100,
        Math.max(1, Number(q.limit) || 12)
    );

    return {
        page,
        limit,
        skip: (page - 1) * limit
    };
}