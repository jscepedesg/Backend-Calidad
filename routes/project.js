'use strict'
 var express = require('express');
 var projectController = require('../controllers/project');

 var router = express.Router();

 var multipart = require('connect-multiparty');
 var multipartMiddleware = multipart({uploadDir: './uploads'});

 //Rutas typePay
 router.post('/save-typePay',projectController.saveTypePay);
 router.get('/typePay/:id?', projectController.getTypePay); 
 router.get('/typePays', projectController.getTypePays);
 router.put('/typePay/:id', projectController.updateTypePay);
 router.delete('/typePay/:id', projectController.deleteTypePay);
 //Rutas Plan
 /*router.post('/save-plan',projectController.savePlan);
 router.get('/plan/:id?', projectController.getPlan);
 router.get('/plans', projectController.getPlans);
 router.put('/plan/:id', projectController.updatePlan);
 router.delete('/plan/:id', projectController.deletePlan);
 //Rutas Company
 router.post('/save-company',projectController.saveCompany);
 router.get('/company/:id?', projectController.getCompany);
 router.get('/companys', projectController.getCompanys);
 router.put('/company/:id', projectController.updateCompany);
 router.delete('/company/:id', projectController.deleteCompany);
 //Rutas Client
 router.post('/save-client',projectController.saveClient);
 router.get('/client/:id?', projectController.getClient);
 router.get('/clients', projectController.getClients);
 router.put('/client/:id', projectController.updateClient);
 router.delete('/client/:id', projectController.deleteClient);
 //Rutas medical profile
 router.post('/save-medicalProfile',projectController.saveMedicalProfile);
 router.get('/medicalProfile/:id?', projectController.getMedicalProfile);
 router.get('/medicalProfiles', projectController.getMedicalProfiles);
 router.put('/medicalProfile/:id', projectController.updateMedicalProfile);
 router.delete('/medicalProfile/:id', projectController.deleteMedicalProfile);
 //Rutas Kid
 router.post('/save-kid',projectController.saveKid);
 router.get('/kid/:id?', projectController.getKid);
 router.get('/kids', projectController.getKids);
 router.put('/kid/:id', projectController.updateKid);
 router.delete('/kid/:id', projectController.deleteKid);
 //Rutas lunchbox
 router.post('/save-lunchbox',projectController.saveLunchbox);
 router.get('/lunchbox/:id?', projectController.getLunchbox);
 router.get('/lunchboxs', projectController.getLunchboxs);
 router.put('/lunchbox/:id', projectController.updateLunchbox);
 router.delete('/lunchbox/:id', projectController.deleteLunchbox);
 //Rutas order
 router.post('/save-order',projectController.saveOrder);
 router.get('/order/:id?', projectController.getOrder);
 router.get('/orders', projectController.getOrders);
 router.put('/order/:id', projectController.updateOrder);
 router.delete('/order/:id', projectController.deleteOrder);
 //Ruta login
 router.post('/signin', projectController.loginUsuario);*/



 module.exports = router;