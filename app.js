var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// firebase.initializeApp(firebaseConfig);
// const db=firebase.firestore();
// const customers=db.collection("Customers");
// module.exports=customers;
// app.get("/", async (req, res) => {
//   const snapshot = await customers.get();
//   const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   res.send(list);
// });
// app.post("/create", async (req, res) => {
//   const data = req.body;
//   await customers.add({ data });
//   res.send({ msg: "money sent" });
// });
// app.post("/update", async (req, res) => {
//   const id = req.body.id;
//   delete req.body.id;
//   const data = req.body;
//   await customers.doc(id).update(data);
//   res.send({ msg: "Updated" });
// });
// app.post("/delete", async (req, res) => {
//   const id = req.body.id;
//   await customers.doc(id).delete();
//   res.send({ msg: "Deleted" });
// });
// app.get("/transfer", async (req, res) => {
//   try {
//     const UserJson = {
//       received: req.query.received,
//       amount: req.query.amount,
//     };
//     const response = db.collection("customers").add(UserJson);
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = app;
app.use(express.static(path.resolve("./public")));
const { v4 } = require('uuid');
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});
app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});
module.exports = app;