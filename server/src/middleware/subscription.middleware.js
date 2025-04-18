import User from "../db/models/user.model.js"

const productMiddleware = async (req, res, next) => {
    const { user } = req
    const { id } = user
    const lookUpUser = await User.findById(id)

    if (lookUpUser.totalProduct - lookUpUser.product > 0) {
        return  next()
    }

    return res.status(400).json({ message: 'Please Subscribe To Use Platform' });


}


const regenerationsMiddleware = async (req, res, next) => {
    const { user } = req
    const { id } = user
    const lookUpUser = await User.findById(id)

    if (lookUpUser.totalRegenerations - lookUpUser.regenerations > 0) {
      return  next()
    }


    return res.status(400).json({ message: 'Please Subscribe To Use Image Product Generation' });


}


export {
    regenerationsMiddleware,
    productMiddleware
}