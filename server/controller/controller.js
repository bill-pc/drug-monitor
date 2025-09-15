let Drugdb = require('../model/model');


// creates and saves a new drug
exports.create = (req,res)=>{
    // validate incoming request
    if(!req.body){// if content of request (form data) is empty
        res.status(400).send({ message : "Content cannot be emtpy!"});// respond with this
        return;
    }

    //create new drug
    const drug = new Drugdb({
        name : req.body.name,//take values from form and assign to schema
        card : req.body.card,
        pack: req.body.pack,
        perDay : req.body.perDay,
        dosage : req.body.dosage
    })

    //save created drug to database
    drug
        .save(drug)//use the save operation on drug
        .then(data => {
            console.log(`${data.name} added to the database`) 
            res.redirect('/manage');
        })
        .catch(err =>{
            res.status(500).send({//catch error
                message : err.message || "There was an error while adding the drug"
            });
        });

}


// can either retrieve all drugs from the database or retrieve a single user
exports.find = (req,res)=>{

    if(req.query.id){//if we are searching for drug using its ID
        const id = req.query.id;

        Drugdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Can't find drug with id: "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving drug with id: " + id})
            })

    }else{
        Drugdb.find()
            .then(drug => {
                res.send(drug)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "An error occurred while retriving drug information" })
            })
    }
}


// edits a drug selected using its  ID
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Cannot update an empty drug"})
    }

    const id = req.params.id;
    Drugdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Drug with id: ${id} cannot be updated`})
            }else{
                res.send(data);
                //res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error in updating drug information"})
        })

}


// deletes a drug using its drug ID
exports.delete = async(req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "Drug ID is required" });
        }

        const drug = await Drugdb.findByIdAndDelete(id);

        if (!drug) {
            return res.status(404).json({ message: `Drug with id ${id} not found` });
        }

        res.status(200).json({
            message: `Drug "${drug.name}" was deleted successfully!`,
            deletedDrug: drug
        });
    } catch (err) {
        res.status(500).json({
            message: `Error deleting drug with id ${req.params.id}`,
            error: err.message
        });
    }
};