const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = new Schema( {
    date: { type: String },
    name: { type: String },
    amount: { type: Number },
})

const Budgetschema = mongoose.model('budget', budgetSchema)
module.exports = Budgetschema




