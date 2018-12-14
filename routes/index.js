var express = require('express');
var router = express.Router();

router.post('/login');
/**
 * @swagger
 * definitions:
 *   login:
 *     properties:
 *       user_id:
 *         type: string
 *       password:
 *         type: string
 */
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - login
 *     description: user login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: user id
 *         in: body
 *         required: true
 *       - name: password
 *         description: user id
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         description: Login Successful
 */

module.exports = router;
