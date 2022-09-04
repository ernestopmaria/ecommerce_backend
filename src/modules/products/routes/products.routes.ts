import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

// Routes
const productsRouter = Router();

//Controllers
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.post('/', productsController.create);
productsRouter.get('/:id', productsController.show);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
