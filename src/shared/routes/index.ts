import Router from 'express'
import clientRoutes from './client.route';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';
import productRoutes from './product.route';
import animalRoutes from './animal.route';

const router = Router()

router.use('/client', clientRoutes)
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)
router.use('/animal', animalRoutes)

export default router;