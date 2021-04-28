import { Router } from 'express';

export default (router: Router): void => {
  router.get('/health', (req, res) => res.sendStatus(200));
};
