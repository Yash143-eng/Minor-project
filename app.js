
const express = require('express')
const student = require('./model/student')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app = express()
const PORT = 5000
mongoose.connect('mongodb://localhost:27017/student')
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))
app.get('/', async (req, res)=>{
    const students = await student.find() 
    res.render('index',{students})
})
app.post('/save', async (req,res)=>{
    const {fname,father,mother,mobileno,course}=req.body
    const students=new student({fname,father,mother,mobileno,course})
    await students.save()
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    const studentData = await student.findById(req.params.id);
    res.render('edit', { student: studentData });
});

app.post('/edit/:id', async (req, res) => {
    const { fname, father, mother, mobileno, course } = req.body;
    await student.findByIdAndUpdate(req.params.id, { fname, father, mother, mobileno, course });
    res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
    await student.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
app.listen(PORT,() =>
    console.log("Hello"))

