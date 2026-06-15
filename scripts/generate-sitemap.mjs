import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:4173';
const routes = [
  '/',
  '/ferramentas/qual-meu-ip',
  '/ferramentas/base64-para-imagem',
  '/ferramentas/imagem-para-base64',
  '/ferramentas/cpf',
  '/ferramentas/cnpj',
  '/ferramentas/formatador-json',
  '/ferramentas/decodificador-jwt',
];

const entries = routes
  .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

writeFileSync(resolve('public/sitemap.xml'), xml, 'utf8');
writeFileSync(resolve('public/robots.txt'), robots, 'utf8');
