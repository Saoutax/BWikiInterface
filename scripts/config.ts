import 'dotenv/config';

const env = process.env;

const SESSDATA = env['SESSDATA']!;

const apiUrl = ''; // 目标站点 API 地址，例如 https://wiki.biligame.com/tools/api.php

const userAgent = env['USERAGENT']!;

export { SESSDATA, apiUrl, userAgent };
