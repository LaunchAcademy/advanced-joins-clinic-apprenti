import express from "express"

const router = new express.Router()

const clientRoutes = ["/projects/:id"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
