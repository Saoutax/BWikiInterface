import 'dotenv/config';

/* 下方内容无需修改 */
const env = process.env;
const SESSDATA = env['SESSDATA']!;
const userAgent = env['USERAGENT']!;
/* 上方内容无需修改 */


/* ！！！请修改下方内容！！！ */

const apiUrl = ''; // 目标站点 API 地址，例如 https://wiki.biligame.com/tools/api.php

const banner = `/**
 * ------------------------------------------------------
 * !!!!!  请勿手动修改本页面内容，否则你的编辑将被覆盖  !!!!!
 * ------------------------------------------------------
 */`; // 脚本上方提示，需为 JavaScript 与 CSS 均接受的注释格式

export { SESSDATA, userAgent, apiUrl, banner };
