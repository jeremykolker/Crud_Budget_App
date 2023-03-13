const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000
const mongoURI = 'mongodb://localhost:27017/budget'
const Budget = require('./models/budget.js')
const Budgetschema = require('./models/schema.js')


app.use(express.urlencoded({extended: true}))

// SEED DATA ROUTE \\
app.get('/budget/seed', (req, res) => {
    Budgetschema.create(Budget).then((data) => {
        res.redirect('/budget')
    })
}) 

// INDEX ROUTE \\
app.get('/budget', (req, res) => {
    Budgetschema.find({}).then((data) => {
      let bankAccount = 0;
      for (let i = 0; i < data.length; i++) {
        bankAccount += data[i].amount;
      }
      res.render('index.ejs', {data: data, bankAccount: bankAccount})
    })
  })
  


app.get('/budget:id', (req, res) => {
    Budgetschema.findById({}).then((data) => {
        res.render('index.ejs', {data: data});
    })
})

// ADD  ROUTE \\

app.get('/budget/new', (req, res)=>{
    res.render('new.ejs')
});

app.post('/budget', (req, res) => {
    Budgetschema.create(req.body).then(() => {
        res.redirect('/budget')
    }).catch((err) => {
        console.log(err)
        res.redirect('/budget/new')
    })
})

// EDIT ROUTE \\
app.get('/budget/edit/:id', (req, res) => {
    Budgetschema.findById(req.params.id).then((data) => {
      res.render('edit.ejs', { data: data });
    });
  });
  

// UPDATE \\ 
  app.post('/budget/edit/:id', (req, res) => {
    Budgetschema.findByIdAndUpdate(req.params.id, {
      $set: {
        date: req.body.date,
        name: req.body.name,
        amount: req.body.amount,
      },
    }).then(() => {
      res.redirect('/budget')
    })
  })
  
  // DELETE ROUTE \\
  app.get('/budget/delete/:id', (req, res) => {
    Budgetschema.findByIdAndRemove(req.params.id).then(() => {
      res.redirect('/budget')
    })
  })
  

  
app.use(express.urlencoded({extended: true}))

mongoose.connect(mongoURI)

app.listen(3000, () => {
  console.log("listening...")
})


