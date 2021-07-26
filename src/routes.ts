import {Router} from "express";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import {Request, Response} from "express";

import {CreateUserController }from './useCases/createUser/CreateUserController';
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserControler = new CreateUserController();
const authenticateUserControler = new AuthenticateUserController();
const refreshTokernUserControler = new RefreshTokenUserController();

router.post('/users', createUserControler.handle);
router.post('/login', authenticateUserControler.handle);
router.post('/refresh-token', refreshTokernUserControler.handle);

router.get('/courses', ensureAuthenticated, (req: Request, res: Response) => {
    return res.json([
        {id: 1, name: 'NodeJs'},
        {id: 2, name: 'ReactJs'}
    ])
})

export {router};