const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { getCurrencies, getConversionPrice } = require('../external_APIs/currency_converter_api')

// @desc gets all available currencies
// @route   GET /api/v1/currency
// @access  Private
const getCurrenciesList = asyncWrapper(async (req, res, next) => {
    const currencies = await getCurrencies()
    if (!currencies) return next(createCustomError(`No currencies could be found`, 404))
    return res.status(200).json(currencies)
})

const currencyConversionPrice = asyncWrapper( async (req, res, next) => {
    const {currency} = req.params

    const conversionRate = await getConversionPrice(currency)
    
    if(!conversionRate) return  next(createCustomError(`No currency conversion could be found`, 404))

    return res.status(200).json(conversionRate)
})

module.exports = {
    getCurrenciesList,
    currencyConversionPrice,
}