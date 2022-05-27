module.exports = function (err, req, res, next) {
    const status = err.code || 500;
    // let newToken = res.newToken ? res.newToken : null
    console.log('ERROR #####', err.message);
    let data = {
      success: false,
      message: 'Internal Server Error',
      // newToken: newToken,
    };
    res.status(status);
    res.status(status).send(data);
  };
  