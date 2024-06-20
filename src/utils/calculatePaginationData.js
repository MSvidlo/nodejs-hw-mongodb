
export const calculatePaginationData = (count, perPage, page) => {
    const totalPage = Math.ceil(count / perPage);
    const hasNextPage = Boolean(totalPage - page);
    const hasPreviousPage = page != 1;
    return {
        status: 200,
        message:"Successfully found contacts!",
        data:contacts,
        page,
        perPage,
        totalItems: count,
        totalPage,
        hasNextPage,
        hasPreviousPage,
    }
}
