import pg from "pg"
import Assignment from "../models/Assignment.js"
import Project from "../models/Project.js"
import User from "../models/User.js"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/advanced_joins_development" })

class Seeder {
  static async seed() {
    const project = new Project({name: "Visit Oz" , description: "We're off to see the wizard!"})
    await project.save()

    const user1 = new User({firstName: "Dorothy" , lastName: "Gale",  email: "dorothy@kansas.com"})
    const user2 = new User({firstName: "Cowardly", lastName: "Lion", email: "scared@overtherainbow.com"})
    const user3 = new User({firstName: "Glinda", last_name: "The Good", email: "glinda@overtherainbow.com"})
    await user1.save()
    await user2.save()
    await user3.save()

    const assignment = new Assignment({userId: user1.id, projectId: project.id})
    await assignment.save()
  }
}

export default Seeder
