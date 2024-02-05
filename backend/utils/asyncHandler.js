const asyncHandler = (func) => async (req, res, next) => {
    console.log("inside asynchandler");
    Promise.resolve(func(req, res, next)).catch(err => next(err))
}

export default asyncHandler;

