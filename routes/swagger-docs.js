/**
 * @author: Vikram Viswanathan
 * @version: 1.0.0
 * @date: December 14, 2018
 * @Description: Implementation of Swagger definitions for Swagger API documentation.
 */

/**
 * @swagger
 * definitions:
 *   emailOTPRequest:
 *     properties:
 *       email:
 *         type: string
 *         example: "abc@xyz.com"
 *       subject:
 *         type: string
 *         example: "abc"
 *       text:
 *         type: string
 *         example: "xyz"
 *
 *   emailOTPResponse:
 *     properties:
 *       Message:
 *         type: string
 *         example: "abcdef"
 */

 /**
 * @swagger
 * /emailotp:
 *   post:
 *     tags:
 *       - Email OTP Services
 *     description: Returns the OTP of the registered number.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: OTP Generation
 *         description: An object of OTP generation
 *         in: body
 *         required: true  
 *         schema:
 *           $ref: '#/definitions/emailOTPRequest' 
 *     responses:
 *       200:
 *         description: An object of OTP
 *         schema:
 *           $ref: '#/definitions/emailOTPResponse'
 */