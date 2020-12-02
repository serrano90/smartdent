/**
 * Paginations data
 */

const itemByPage = 10

function transformPaginations(total, page) {
    const currentPage = page ? parseInt(page) : 1
    const totalPage = (total === 0 ? 0 : (total <= itemByPage ? 1 : Math.ceil(total / itemByPage)))

    return {
        totalRecords: total,
        totalPage: totalPage,
        currentPage: currentPage,
        nextPage: total === 0 ? 0 : page * itemByPage < total ? currentPage + 1 : null,
        previousPage: total === 0 ? 0 : currentPage !== 1 ? currentPage - 1 : null,
        initialValue: total > 0 ? (currentPage - 1) * itemByPage + 1 : 1,
        finishValue: currentPage * itemByPage > total ? total : currentPage * itemByPage,
    }
}

module.exports = {
    transformPaginations
}