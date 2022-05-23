import express, { Express, Request, Response, Router } from "express";
import multer, { Multer } from "multer";
import { MulterFields } from "./src/types";

const app: Express = express();
const router: Router = express.Router();
const upload: Multer = multer({ dest: __dirname + '/public/images' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/images/upload/array', upload.array('images', 10), async (req: Request, res: Response) => {
    try {
        if (typeof req.files !== 'undefined') {
            (req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => {
                console.log(file.filename);
            });
        }
        return res.status(200).json({ message: 'Oke!' });
    } catch (e) {
        return res.status(400).json({ message: 'Not Oke!' });
    }
});

router.post('/images/upload/fields', upload.fields([{
    name: 'foo',
    maxCount: 10
}, {
    name: 'bar',
    maxCount: 10
}]), async (req: Request, res: Response) => {
    try {
        console.log((req.files as MulterFields)?.foo);
        return res.status(200).json({ message: 'Oke!' });
    } catch (e) {
        return res.status(400).json({ message: 'Not Oke!' });
    }
})

app.use(router);

app.use('*', (req: Request, res: Response) => {
    return res.status(500).json({
        message: "Not Found"
    });
});

app.listen(3000, () => console.log(`Server is listening on http://localhost:3000`));