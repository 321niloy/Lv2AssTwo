
import express, { Application, Request, Response } from 'express'
import cors from "cors"
import { productRoute } from './apps/module/product/product.route'
import { OrderRoute } from './apps/module/order/order.route'
const app:Application = express()


app.use(express.json())
app.use(cors())



app.use('/api/products' , productRoute);
app.use('/api/orders' , OrderRoute)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;

