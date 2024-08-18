import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/users', (req, res) => {
  res.json([{ name: 'John Doe' }]);
});

module.exports = router;
