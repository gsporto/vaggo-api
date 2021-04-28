import { createConnection } from 'typeorm';
import config from '@config/database';

createConnection({ ...config })
  .then()
  .catch(err => console.log(err));
