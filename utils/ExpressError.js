class ExpressError extends Error {
    constructor(message, statusCode){
        super(); // call the constructor of the super class (in this case Error)

        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;