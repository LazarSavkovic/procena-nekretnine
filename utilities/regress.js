const regress = function (flat, weights) {
    value = weights.intercept + flat.geometry.coordinates[1] * weights.coefficients[0] + flat.geometry.coordinates[0] * weights.coefficients[1] + flat.sq_mt * weights.coefficients[2] + flat.rooms * weights.coefficients[3]
    return value
}


module.exports = regress;