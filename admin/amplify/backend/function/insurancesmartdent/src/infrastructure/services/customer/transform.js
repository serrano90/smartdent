/**
 * Plans Transform
 * 
 */

const { Customer } = require("../../../domain/entity")

const toCustomerEntity = Customer

const toCustomerEntityBasicData = function(entity) {
    return {
        id: entity.externalId,
        fullName: entity.name,
        email: entity.email,
        status: entity.status,
        createdAt: entity.created,
        haveCardRegister: entity.last4CardDigits !== null
    }
} 

module.exports = {
    toCustomerEntity,
    toCustomerEntityBasicData
}