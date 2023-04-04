import {Router} from "express";

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', (req, res) => {
        res.send('GET request to the homepage');
    });

    router.post('/', (req, res) => {
        res.send('POST request to the homepage');
    });

    router.patch('/:id', (req, res) => {
        res.send('PATCH request to the homepage');
    });

    router.delete('/:id', (req, res) => {
        res.send('DELETE request to the homepage');
    });

    return router;
};