const mongoose = require('mongoose');

async function run() {
    try {
        mongoose.connect('mongodb://localhost:27017/fruitsDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); //connects to DB if not existing it will create

        const fruitsSchema = new mongoose.Schema({
            name: {
                type : String,
                required : true
            },
            rating: Number,
            review: String
        });

        const Fruit = mongoose.model("Fruit", fruitsSchema); // The paramerter Fruit will be converted to fruits (done by mongo)

        const fruit = new Fruit({
            name: "Kiwi",
            rating: 3,
            review: "Pretty bad"
        });

       // await fruit.save();

        const orange = new Fruit({
            name: "orange",
            rating: 5,
            review: " good"
        });

        const banana = new Fruit({
            name: "banana",
            rating: 8,
            review: "Pretty healthy"
        });

        // Fruit.insertMany([orange, banana], function(err){
        //     if(err){
        //         console.log(err);
        //     }
        //     else {
        //         console.log("Sucess");
        //     }
        // });

        //New schema for person
        const personSchema = new mongoose.Schema({
            name: String,
            age: Number
        });

        //new Model

        const Person = mongoose.model("Person", personSchema);

        const person = new Person({
            name: "Nishin",
            age: 24
        });

        //person.save();

       //const ret = await Fruit.findOne({_id : "5fa59adcf3b7ab2ec8d82444"});

      // console.log(ret);

        //const ret = await Fruit.updateOne({_id : "5fa59adcf3b7ab2ec8d82444"}, {name : "Peach"});  // Updated kiwi to Peach

        //console.log(ret);

        //await Fruit.deleteOne ({_id : "5fa59adcf3b7ac2ec8d82475"}); // Deleted Peach

        const fruitsData = await Fruit.find();

        fruitsData.forEach((fruit) => {
            console.log(fruit.name);
        });

        


        //console.log(data);
    } catch (err) {
        console.log(`Failed!!! ${err}`);
    } finally {
        await mongoose.connection.close();
    }
}

run();