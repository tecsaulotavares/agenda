import { Router } from "express";

import userController from './Controllers/UserController';
import contactController from './Controllers/ContactController';
import phoneController from './Controllers/PhoneController';
import emailController from './Controllers/EmailController';
import addressController from './Controllers/AddressController';

const routes = Router();

routes.get('/', (req, res) => { res.send("Ok") })

routes.post('/auth/', userController.auth);
routes.get('/user/:id', userController.index);
routes.get('/users/', userController.showAll);
routes.post('/user/', userController.create);
routes.put('/user/:id', userController.update);
routes.delete('/user/:id', userController.delete);

routes.get('/contact/:id', contactController.index);
routes.get('/contacts/', contactController.showAll);
routes.post('/contact/', contactController.create);
routes.put('/contact/:id', contactController.update);
routes.delete('/contact/:id', contactController.delete);

routes.get('/phone/:id', phoneController.index);
routes.get('/phones/', phoneController.showAll);
routes.post('/phone/', phoneController.create);
routes.put('/phone/:id', phoneController.update);
routes.delete('/phone/:id', phoneController.delete);

routes.get('/email/:id', emailController.index);
routes.get('/emails/', emailController.showAll);
routes.post('/email/', emailController.create);
routes.put('/email/:id', emailController.update);
routes.delete('/email/:id', emailController.delete);

routes.get('/address/:id', addressController.index);
routes.get('/addresses/', addressController.showAll);
routes.post('/address/', addressController.create);
routes.put('/address/:id', addressController.update);
routes.delete('/address/:id', addressController.delete);


export default routes;