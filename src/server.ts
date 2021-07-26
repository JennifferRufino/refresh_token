import "express-async-errors";
import express, {Request, Response, NextFunction} from "express";
import {router} from './routes';

const port = process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(router);
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: 'Error',
        message: error.message
    })
})

app.listen(port, () => console.log(`Server is running on port: ${port}`))