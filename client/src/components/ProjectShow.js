import React, { useState, useEffect } from "react"

const ProjectShow = (props) => {
  const [project, setProject] = useState({})

  const getProject = async () => {
    try {
      const projectId = props.match.params.id
      const response = await fetch(`/api/v1/projects/${projectId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setProject(responseBody.project)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getProject()
  }, [])

  let assignedUsersSection
  if(project.users) {
    assignedUsersSection = project.users.map(user => {
      return <li key={user.id}>{user.firstName} {user.lastName}, Manager: {user.manager.firstName} {user.manager.lastName}</li>
    })
  }

  return (
    <>
      <h1>{project.name}</h1>
      <h2>{project.description}</h2>
      <hr />
      <h3>Assigned to this Project:</h3>
      <ul>{assignedUsersSection}</ul>
    </>
  )
}

export default ProjectShow
