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
      // get all associated assignments records
      const query = 'SELECT * FROM assignments WHERE project_id = $1'
      const result = await pool.query(query, [this.id])
      // turn them into Assignment objects
      // const assignmentData = result.rows
      // const assignments = assignmentData.map(assignment => new Assignment(assignment))
      // return assignments
      return result.rows.map(assignment => new Assignment(assignment))
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async users() {
    try {
      // get all of the assignments related to this project
      const relatedAssignments = await this.assignments()
      // for each of those assignments, find the related user 
      
      // `forEach` messes with us, because it uses a callback function
      // and async/await doesn't like callback functions
      // one workaround is to use a `for` loop and avoid the whole issue
      // const users = []
      // for(let i=0; i < relatedAssignments.length; i++) {
      //   const relatedUser = await relatedAssignments[i].user()
      //   users.push(relatedUser)
      // }
      // return users

      // another workaround is to acknowledge that forEach is going to give us a Promise
      const users = relatedAssignments.map(assignment => {
        return assignment.user()
      })
      console.log(users)
      return Promise.all(users)
      // return those user objects
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default Project
