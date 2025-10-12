import express from 'express'
import {getBoard} from '../controllers/board.controller.js'

 const router  = express.Router()

router.get('/' ,getBoard)

 export default router 