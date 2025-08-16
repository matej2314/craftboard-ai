import express, { Request, Response, NextFunction } from 'express';

const app = express();

const PORT = process.env.AI_MANAGER_PORT || 3003;

app.use(express.json());

//global error handler

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
	console.log(`AI Manager is running on port ${PORT}`);
});
