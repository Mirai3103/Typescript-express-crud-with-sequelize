import StatusCodes from 'http-status-codes';
import { Request, RequestHandler, Response, Router } from 'express';
import { UserOutput, UserInput } from '@models/user.model';
import userService from '@services/user-service';
import { ParamMissingError } from '@shared/errors';
import { log } from 'console';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get, (async (_: Request, res: Response) => {
    const users: UserOutput[] = await userService.getAll();
    return res.status(OK).json({ users });
}) as RequestHandler);


/**
 * Add one user.
 */
router.post(p.add, (async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    // eslint-disable-next-line no-console
    await userService.addOne(user as UserInput);

    return res.status(CREATED).end();
}) as RequestHandler);


/**
 * Update one user.
 */
router.put(p.update, (async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.updateOne(user as UserInput);
    return res.status(OK).end();
}) as RequestHandler);


/**
 * Delete one user.
 */
router.delete(p.delete, (async (req: Request, res: Response) => {
    const { id } = req.params;
    log(id, "cccc")
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.delete(id);
    return res.status(OK).end();
}) as RequestHandler);


// Export default
export default router;
