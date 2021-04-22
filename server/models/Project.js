import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/advanced_joins_development"
})

class Project {
  constructor({id, name, description}) {
    this.id = id
    this.name = name
    this.description = description
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM projects WHERE ID = $1;"
      const result = await pool.query(query, [id])
  
      //get the results
      const projectData = result.rows[0]
      const project = new Project(projectData)
  
      return project
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async save() {
    try {
      const query = "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING id;"
      const result = await pool.query(query, [this.name, this.description])
      
      const newId = result.rows[0].id
      this.id = newId
  
      return true
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async assignments() {
    const assignmentFile = await import("./Assignment.js")
    const Assignment = assignmentFile.default

    try {
      const query = 'SELECT * FROM assignments WHERE project_id = $1;'
      const result = await pool.query(query, [this.id])

      const relatedAssignments = result.rows.map(assignment => new Assignment(assignment))

      return relatedAssignments
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async users() {
    const userFile = await import("./User.js")
    const User = userFile.default

    try {
      const assignments = await this.assignments()
      
      // NOTE: we use a `for` loop here to make sure async/await behaves properly
      // const users = []
      // for(let i = 0; i < assignments.length; i++) {
      //   const user = await assignments[i].user()
      //   users.push(user)
      // }
      const users = assignments.map(assignment => assignment.user())

      return Promise.all(users)
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default Project
