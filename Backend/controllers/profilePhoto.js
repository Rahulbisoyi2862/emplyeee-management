const User = require("../models/User")

const profilePhoto = async (req, res) => {
    const { id } = req.body
    const img = req.file
    if (!img) return res.status(400).json({ message: "Img Not Avilebul" })
    const user = await User.findOne({ id })
    if (!user) return res.status(400).json({ message: "user id not funds" })
    user.profileImg=img.filename
   await user.save()
    const imgUrl=user.profileImg
    res.status(200).json({ message: "Your Profile Photo Recived",URL:imgUrl })
}

module.exports = profilePhoto