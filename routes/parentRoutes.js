import Router from 'express';
import { protect, parentOnly } from '../middlewares/auth.js';
import { getParents, getParentById, updateParent, deleteParent } from '../controllers/parentController.js';



// Create a Router
const parentRouter = Router();


// parent routes
parentRouter.get('/parents', protect, parentOnly, getParents);
parentRouter.get('/parents/:id', protect, parentOnly, getParentById);
parentRouter.put('/parents/:id', protect, parentOnly, updateParent);
parentRouter.delete('/parents/:id', protect, parentOnly, deleteParent);


export default parentRouter;
