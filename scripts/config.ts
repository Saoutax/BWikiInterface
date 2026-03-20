import 'dotenv/config';

const env = process.env;

const SESSDATA = env['SESSDATA']!;

const apiUrl = '';

const userAgent = env['USERAGENT']!;

export { SESSDATA, apiUrl, userAgent };
