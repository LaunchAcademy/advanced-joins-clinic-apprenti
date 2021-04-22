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
}

export default Project
