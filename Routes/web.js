import express from "express";
import userController from "../Controllers/userControllers.js";

// creating router object
const router = express.Router();

//base routing for all controllers
router.get('', userController.home);
router.get('/reg', userController.registration);
router.post('/reg', userController.createUserDoc);
router.get('/login', userController.login);
router.post('/login', userController.veryfyUser);
router.get('/dashboard', userController.dashboard);

export default router;