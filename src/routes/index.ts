"use strict"
import { Request, Router, Response } from 'express'
// import { userRouter } from './user'
import { userStatus } from '../common'
import { authRoute } from './auth';
// import { userRouter } from './user'



const router = Router()

router.use("/auth", authRoute);

// const accessControl = (req: Request, res: Response, next: any) => {
//     req.headers.userType = userStatus[req.originalUrl.split('/')[1]]
//     next()
// }
// router.use('/user',  accessControl, userRouter)


export { router }