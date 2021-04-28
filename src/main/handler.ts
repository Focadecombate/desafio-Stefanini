import { prisma } from '../infra/database/prisma/utils/prisma-client';
import serverless from 'serverless-http';

module.exports.handler = async (event, context) => {
  const app = (await import('./config/app')).default;
  const handler = serverless(app);
  await prisma.$connect();
  const result = handler(event, context);
  return result;
};
