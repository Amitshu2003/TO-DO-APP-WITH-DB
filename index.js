const express = require('express');
const port = process.env.PORT|| 3000;

const db = require('./config/mongoose');
const Tasks = require('./models/todolist');
const app = express();

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){

  Tasks.find({},function(err,task){
    if(err)
    console.log(err);

    return res.render('home',{
      title:"Home",
      tasks_list:task
    })
  })

})


app.post('/tasks',function(req,res){
  if(req.body.due=="")
  req.body.due = "No Deadline"
  Tasks.create(req.body,function(err){
    if(err)
    console.log(err);

    return res.redirect('back');
  })

})

app.post('/delete-tasks',function(req,res){
  var removeTasks = req.body.check;

  // if single task is to be deleted
  if(typeof(removeTasks) === "string"){
      Tasks.findByIdAndDelete(removeTasks, function(err){
          if(err){
              console.log('error');
              return;
          }
      });
  }
  else{ // if multiple task is to be deleted
      for(let i of removeTasks){
          Tasks.findByIdAndDelete(i, function(err){
              if(err){
                  console.log('error');
                  return;
              }
          });
      }
  }

  return res.redirect('back');

})




app.listen(port,function(err){
  if(err){
    console.log(`Error : ${err}`);
  }

  console.log(`Server is running on port : ${port}`);
})
