import Role from '../models/Role.js'
import User from '../models/User.js'

export const createRol = async () => {
  try {
    const contador = await Role.estimatedDocumentCount()

    if (contador > 0) return

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'moderator' }).save(),
      new Role({ name: 'admin' }).save()
    ])
    console.log(values)
    await createUserAdmin()
  } catch (error) {
    console.log(error)
  }
}

export const createUserAdmin = async () => {
  try {
    const contador = await User.estimatedDocumentCount()

    if (contador > 0) return

    const newUser = new User({
      username: 'joaquin',
      email: 'eder@gmail.com'
    })

    const role = await Role.findOne({ name: 'admin' })
    newUser.roles = [role._id]
    newUser.password = await User.encryptPassword('123456')

    const values = await Promise.all([
      newUser.save()
    ])
    console.log(values)
  } catch (error) {
    console.log(error)
  }
}
