const regress = function (flat, weights) {
    value = weights.intercept + flat.lat * weights.coefficients[0] + flat.long * weights.coefficients[1] + flat.sq_mt * weights.coefficients[2] + flat.rooms * weights.coefficients[3]
    return value
}


module.exports = regress;