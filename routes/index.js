var express = require('express');
var router = express.Router();
// const firebase=require('firebase');
/* GET home page. */
var cnt=5000;
const customers={
   receiver:"",
   amount:""
}
const app = express();
const { async } = require("@firebase/util");
const { FieldValue } = require("firebase-admin");
const { db } = require("../firebase.js");
router.get('/', function(req, res, next) {
  res.render('index',{data:cnt});
});
router.get('/transfer', (req,res)=> {
  res.render('transfer');
});
router.get('/receive', (req,res)=> {
  res.render('receive');
});
router.get('/receivedata',(req,res)=>{
  var amount=req.query.amount;
  cnt=cnt+parseInt(amount);
  res.render('receivedmoney')
})
router.get("/senddata", function (req, res) {
  var amount=req.query.amount;
  console.log(amount);
  if(amount>cnt)
  {
     res.render('insufficient');
  }
  else
  {
     cnt=cnt-amount;
     const UserJson = {
      receiver: req.query.receiver,
      amount: req.query.amount,
    };
    db.collection("customers").add(UserJson);
    console.log('data sent');
    res.render("success");
  }
});
// router.get('/retrieve',function(req,res){
//   db.collection("customers").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//            customers.receiver=doc.data().receiver;
//            customers.amount=doc.data().amount;
//            console.log(customers)
//         })
//     });
//     res.render('retrieve',{data:[customers]})
// });
router.get("/retrieve", async (req, res) => {
  // const c = req.params.receiver;
  // console.log(c);
  try {
    const usersRef = db.collection('customers');
    const doc = await usersRef.get();
    let responseArr = [];
    doc.forEach((ele) => {
      responseArr.push(ele.data());
      console.log(ele.data());
    });
    res.render("retrieve",{responseArr:responseArr});
    console.log(responseArr);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
