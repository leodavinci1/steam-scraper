module.exports =
    function (handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res)
            } catch (ex) {
                console.log(ex);
                return res.json({ succes: false, message: "Error! Please try again later"})
                next(ex)
            }
        }
    }
