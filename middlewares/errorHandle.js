module.exports = function errorHandler() {
  return async (ctx, next) => {
    try {
      console.log(2);
      await next();
      console.log(1);
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      //   await ctx.render("error", {
      //     title: ctx.status,
      //     msg: err.message
      //   });
      //   ctx.app.emit("error", err, ctx);
    }
  };
};
