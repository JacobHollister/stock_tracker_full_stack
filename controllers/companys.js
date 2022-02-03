const getCompanys = (req, res) => {
    res.send('all companys info')
}
const getCompanyInfo = (req, res) => {
    res.send(`show ticker:${req.params.ticker} company info`)
}
const updateCompanyInfo = (req, res) => {
    res.send(`update ticker:${req.params.ticker} company info`)
}
const removeCompanyinfo = (req, res) => {
    res.send(`remove ticker:${req.params.ticker} company info`)
}

module.exports = {
    getCompanys,
    getCompanyInfo,
    updateCompanyInfo,
    removeCompanyinfo
}