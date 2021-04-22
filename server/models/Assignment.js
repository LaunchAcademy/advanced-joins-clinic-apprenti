import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/advanced_joins_development"
})

class Assignment {
  constructor({id, user_id, userId, project_id, projectId}) {
    this.id = id
    this.userId = userId || user_id
    this.projectId = projectId || project_id
  }

  async save() {
    try {
      const query = "INSERT INTO assignments (user_id, project_id) VALUES ($1, $2) RETURNING id;"
      const result = await pool.query(query, [this.userId, this.projectId])
      
      const newId = result.rows[0].id
      this.id = newId
  
      return true
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default Assignment
