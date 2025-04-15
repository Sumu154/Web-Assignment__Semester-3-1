const taskModel = require('../models/taskModel')


const createTask = async (req, res) => {
  try{
    // //console.log('post api hitting');
    const task = req.body;

    const createdTask = await taskModel.create(task);
    res.status(200).json(createdTask);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}


const getTasks = async (req, res) => {
  try{
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
  
}



const getTaskById = async (req, res) => {
  try{
    const id = req.params.id;
    // //console.log(id);
    const task = await taskModel.findOne( {_id: id} );
    res.status(200).json(task);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}

// get task role
const getTaskRole = async (req, res) => {
  try{
    const { task_email } = req.params;
    const task = await taskModel.findOne( {task_email} );
    res.status(200).json(task.task_role);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}


// get task by email
const getTaskByEmail = async (req, res) => {
  try{
    const task_email = req.params.task_email;
    // //console.log(task_email);
    const task = await taskModel.findOne( {task_email} );
    res.status(200).json(task);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}




// total task
const getTotalTasks = async (req, res) => {
  try{
    const totalTasks = await taskModel.countDocuments();
    res.status(200).json(totalTasks);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}

module.exports = { 
  createTask, 
  getTasks,
  getTaskById, 
  getTaskByEmail, 
  getTaskRole, 
  getTotalTasks
};
