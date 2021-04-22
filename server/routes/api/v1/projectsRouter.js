import express from "express"
import Project from "../../../models/Project.js"

const projectsRouter = new express.Router()

projectsRouter.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    project.users = await project.users()

    console.log(project.users)
    // loop over project.users and get the manager for each
    // nest it under the user
    for(let i = 0; i < project.users.length; i++) {
      const user = project.users[i]
      user.manager = await user.manager()
    }
    
    res.json({ project })
      //get and return a single adventure using the model
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default projectsRouter
