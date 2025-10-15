import express from 'express'
import {deletePins, getPins } from '../controllers/pin.controller.js'

 const router  = express.Router()

router.get('/' ,getPins)
router.delete('/delete-pins' , deletePins)

 export default router ;