import Role from '../models/Role.js'
import User from '../models/User.js'
import Profile from '../models/Profile.js'

export const createRol = async () => {
  try {
    const contadorBefore = await Role.estimatedDocumentCount()

    if (contadorBefore > 0) return

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save()
    ])
    console.log(values)

    const contadorAfter = await Role.estimatedDocumentCount()

    if (contadorAfter > 0) {
      await createUserAdmin()
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUserAdmin = async () => {
  try {
    const contador = await User.estimatedDocumentCount()

    if (contador > 0) return

    const newUser = new User({
      emailOMobileNumber: 'ederrr2802@gmail.com',
      fullname: 'Eder Olmedo Rimarachin Rimarachin',
      username: 'joaquin'
    })

    const role = await Role.findOne({ name: 'admin' })
    newUser.roles = [role._id]
    newUser.password = await User.encryptPassword('123456')

    const savedUser = await newUser.save()

    console.log('User', savedUser)

    const profile = new Profile({
      fullname: savedUser.fullname,
      username: savedUser.username,
      imgProfile: '/assets/images/profile_ph.png',
      userId: savedUser.id
    })

    const values = await Promise.all([
      profile.save()
    ])

    console.log('Profile', values)
  } catch (error) {
    console.log(error)
  }
}
