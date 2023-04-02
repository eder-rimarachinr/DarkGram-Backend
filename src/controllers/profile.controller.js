import Profile from '../models/Profile.js'

export const getMyProfile = async (req, res) => {
  const myProfile = await Profile.findById(req.userId).populate('posts',
    {
      description: 1,
      imgUrl: 1,
      likes: 1,
      comments: 1
    })

  if (!myProfile) return res.status(404).json({ message: 'The profile does not exists' })

  res.status(200).json(myProfile)
}

export const getProfileByUser = async (req, res) => {
  const { username } = req.params

  const profile = await Profile.findOne({
    $or: [
      { id: username },
      { username }
    ]
  }).populate('posts',
    {
      description: 1,
      imgUrl: 1,
      likes: 1,
      comments: 1,
      user: 0
    })

  if (!profile) return res.status(404).json({ message: 'The profile does not exists' })

  res.status(200).json(profile)
}
