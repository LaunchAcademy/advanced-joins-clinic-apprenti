import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/advanced_joins_development"
})

class User {
  constructor({id, first_name, firstName, last_name, lastName, email, managerId, manager_id }) {
    this.id = id
    this.firstName = firstName || first_name
    this.lastName = lastName || last_name
    this.email = email
    this.managerId = managerId || manager_id
  }

  async save() {
    try {
      const query = "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id;"
      const result = await pool.query(query, [this.firstName, this.lastName, this.email])
      
      const newId = result.rows[0].id
      this.id = newId
  
      return true
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default User
