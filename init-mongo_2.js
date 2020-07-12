db.createUser({
  user: "admin",
  pwd: "rootuser",
  roles: [
    {
      role: "readWrite",
      db: "company"
    }
  ]
})