import { Router } from "express"
import {createUserClient,createUserProfessional, loginUserClient, loginUserProfession} from "../controllers/usuarios.js"

const router=Router()

router.post('/registroCliente', createUserClient)
router.post('/registroProfesional', createUserProfessional)
router.post('/loginCliente', loginUserClient)
router.post('/loginProfesional',loginUserProfession)

export default router