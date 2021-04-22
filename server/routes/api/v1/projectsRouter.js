import express from "express"
import Project from "../../../models/Project.js"

const projectsRouter = new express.Router()

projectsRouter.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    
    res.json({ project })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default projectsRouter
