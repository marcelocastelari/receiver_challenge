const paginate = (page, pageSize) => {
    const pageNumber = parseInt(page, 10);
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    return {
        skip,
        size
    }
}

module.exports = { paginate };