const express=require('express');
const MongoClient=require('mongodb').MongoClient;
const bodyParser=require('body-parser');
const app=express();
const port=8000;
const Joi =require('joi');

app.use(express.json());

//const port=process.env.port || 3000;//permet de changer de port exple export 5000
const personnes=[
    {id:1,nom:'mame'},
    {id:2,nom:'ciré'},
    {id:3,nom:'valérie'}
];

app.listen(port, ()=>{
    console.log(`Ecoute sur le port ${port}`);
});

app.get('/',(req,res)=>{
    res.send('Hello world');

});

app.get('/api/personnes',(req,res)=>{
    res.send(personnes);
});

app.get('/api/personnes/:id',(req,res)=>{
    const personne=personnes.find(c=>c.id==parseInt(req.params.id));
    if(!personne)
    res.status(404).send('ID n\'existe pas');
    res.send(personne);
});

app.post('/api/personnes',(req,res)=>{

    const {error}=validatePersonne(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const personne={
        id:personnes.length+1,
        nom:req.body.nom
    };
    personnes.push(personne);
    res.send(personne);
});


app.put('/api/personnes/:id',(req,res)=>{
    const personne=personnes.find(c=>c.id==parseInt(req.params.id));
    if(!personne)
    res.status(404).send('ID n\'existe pas');
    //--------------------------------------------------------------------
    
    const {error}=validatePersonne(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
     //--------------------------------------------------------------------
     personne.nom=req.body.nom;
     res.send(personne);

});

app.delete('/api/personnes/:id',(req,res)=>{
    const personne=personnes.find(c=>c.id==parseInt(req.params.id));
    if(!personne)
    res.status(404).send('ID n\'existe pas');

    const index=personnes.indexOf(personne);
    personnes.splice(index,1);

    res.send(personne);
});


function validatePersonne(personne){
    const schema={
        nom:Joi.string().min(3).required()
    }; 

    return Joi.validate(personne,schema);
}