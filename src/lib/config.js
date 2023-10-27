// config.js
import { DB_PATH as DEV_DB_PATH, ADMIN_PASSWORD as DEV_ADMIN_PASSWORD } from '$env/static/private';

const DB_PATH = process.env.NODE_ENV === 'production' ? process.env.DB_PATH : DEV_DB_PATH;
const ADMIN_PASSWORD = process.env.NODE_ENV === 'production' ? process.env.ADMIN_PASSWORD : DEV_ADMIN_PASSWORD;

export { DB_PATH, ADMIN_PASSWORD };
