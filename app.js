//jshint esversion:6
//
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url);
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   client.close();
// });

const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitDB",{useNewUrlParser:true});

const fruitSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please check your data enry, name of fruit not specified"]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});

const Fruit=mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
  // name:"Apple",
  // rating:11,
  review:"Great fruit"
});


const mango=new Fruit({
  name:"Mango",
  rating:8,
  review:"Great fruit"
});

const watermelon=new Fruit({
  name:"Watermelon",
  rating:9,
  review:"Great fruit"
});

// fruit.save();

const pineapple=new Fruit({
  name:"Pineapple",
  rating:9,
  review:"Good one"
});

// Fruit.insertMany([pineapple,mango],function(err){
//   if (err){
//   console.log("err");
// }else console.log("Success!");
// });

pineapple.save();

const personSchema=new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit:fruitSchema
  // Relationships between two collections that is fruits and people
});

const Person=mongoose.model("person",personSchema);

const person=new Person({
  name:"John",
  age:37,
  // review:"Great fruit"
});

const person1=new Person({
  name:"Areeb",
  age:17,
  favouriteFruit:pineapple
});

person1.save();

// person.save();
Fruit.updateOne({_id:"5ec7ac5c52b9b12f34dda2d1"},{rating:9},function(err){
  if(err)console.log("Error");
  else console.log("No error");
});

Fruit.updateOne({name:"Watermelon"},{rating:10},function(err){
  if(err)console.log("Error");
  else console.log("No error");
});

Fruit.deleteOne({name:"Apple"},function(err){
  if(err)console.log("Error");
  else console.log("No error deleting");
});

Fruit.deleteMany({name:"Mango"},function(err){
  if(err)console.log("Error");
  else console.log("No error delting all mangoes");
});

Fruit.find(function(err,fruits){
  if(err)console.log(err);
  else {
    mongoose.connection.close();
    // console.log(fruits);
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
