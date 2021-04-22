import express from "express"
import projectsRouter from "./api/v1/projectsRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/projects", projectsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
