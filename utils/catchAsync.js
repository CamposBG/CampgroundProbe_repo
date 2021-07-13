// we are returning a function that accepts a function and then execute that function, but ir catch any errors, and passes it to next if there is an error
module.exports = (func) => { // we pass in func
    return (req, res, next) => { // returns a new function that:
        func(req, res, next).catch(next);// that has func executed, and then catches any errors, and pass it to next 
    };
};
