import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { AsyncError } from './middlewares/async.error';
import router from './routes/RegistroRoute';

const app = express();
const asyncError = new AsyncError();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(asyncError.errorHandling.bind(asyncError));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
