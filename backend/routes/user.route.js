  import express from 'express'
import {getUsers , create}  from '../controllers/user.controller.js'
  const router =  express.Router()

 router.post('/create' , create)



  router.get('/' , getUsers)



  export default router ;