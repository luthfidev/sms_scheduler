module.exports = function pagination(page, limit, total) {
    if (page && page < 1) {
      throw new Error('Page Must Bigger Than 0')
    }
    const pageInt = parseInt(page ? page : 1);
    const limitInt = parseInt(limit ? limit : 25);
    const offset = (pageInt - 1) * limitInt;
    const totalPage = Math.ceil(total / limitInt);
    return {
      page: pageInt,
      limit: limitInt,
      offset,
      totalPage,
      totalData: total,
    };
  };
  