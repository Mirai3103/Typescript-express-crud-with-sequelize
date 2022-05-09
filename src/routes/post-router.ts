import StatusCodes from 'http-status-codes';
import { Request, RequestHandler, Response, Router } from 'express';
import { PostInput, PostOutput } from '@models/post.model';
import postService from '@services/post-service';
import { ParamMissingError } from '@shared/errors';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    getAll: '/all',
    getByUser: "/:userId/all",
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.getAll, (async (_: Request, res: Response) => {
    const posts: PostOutput[] = await postService.getAll();
    return res.status(OK).json({ posts });
}) as RequestHandler);

router.get(p.getByUser, (async (req: Request, res: Response) => {
    const { userId } = req.params;
    const post: PostInput[] = await postService.getAllByUser(userId);
    return res.status(OK).json(post);
}) as RequestHandler);

/**
 * Add one user.
 */
router.post(p.add, (async (req: Request, res: Response) => {
    const { post, userId } = req.body;
    // Check param
    if (!userId || !post) {
        throw new ParamMissingError();
    }
    // Fetch data
    await postService.addOne(userId as string, post as PostInput);
    return res.status(CREATED).end();
}) as RequestHandler);


/**
 * Update one user.
 */
router.put(p.update, (async (req: Request, res: Response) => {
    const { post } = req.body;
    // Check param
    if (!post) {
        throw new ParamMissingError();
    }
    // Fetch data
    await postService.updateOne(post as PostInput);
    return res.status(OK).end();
}) as RequestHandler);


/**
 * Delete one user.
 */
router.delete(p.delete, (async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await postService.delete(Number(id));
    return res.status(OK).end();
}) as RequestHandler);


// Export default
export default router;
