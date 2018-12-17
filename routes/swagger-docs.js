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
/**
 * @swagger
 * definitions:
 *   loginRequest:
 *     properties:
 *       username:
 *         type: string
 *         example: "abc@xyz.com"
 *       password:
 *         type: string
 *         example: "abc"
 *
 *   loginResponse:
 *     properties:
 *       Message:
 *         type: string
 *         example: "abcdef"
 */

 /**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - login Services
 *     description: Returns the OTP of the registered number.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login sevice
 *         description: An object of login service
 *         in: body
 *         required: true  
 *         schema:
 *           $ref: '#/definitions/loginRequest' 
 *     responses:
 *       200:
 *         description: login successfull
 *         schema:
 *           $ref: '#/definitions/loginRequest'
 */
/**
 * @swagger
 * definitions:
 *   RegistrationRequest:
 *     properties:
 *       mobile:
 *         type: string
 *       title:
 *         type: string
 *       name:
 *         type: string
 *       company:
 *         type: string
 *       nationality:
 *         type: string
 *       phonenumber: 
 *         type: string
 *       address:
 *         type: string
 *       pobox:
 *         type: string
 *       email:
 *         type: string      
 *       password:
 *         type: string     
 *
 *   RegisterResponse:
 *     properties:
 *       Message:
 *         type: string
 *         example: "abcdef"
 */

 /**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Registration Services
 *     description: Returns the OTP of the registered number.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login sevice
 *         description: An object of Registration service
 *         in: body
 *         required: true  
 *         schema:
 *           $ref: '#/definitions/RegistrationRequest' 
 *     responses:
 *       200:
 *         description: An object of OTP
 *         schema:
 *           $ref: '#/definitions/RegistrationRequest'
 */
/**
 * @swagger
 * definitions:
 *   forgetpasswordRequest:
 *     properties:
 *       username:
 *         type: string
 *         example: "abc@xyz.com"
 *       new_password:
 *         type: string
 *         example: "abc"
 *       confirm_password:
 *         type: string
 *         example: "abc"
 *
 *   forgetpasswordResponse:
 *     properties:
 *       Message:
 *         type: string
 *         example: "abcdef"
 */

 /**
 * @swagger
 * /forgetpassword:
 *   post:
 *     tags:
 *       - forgetpassword Services
 *     description: Returns the OTP of the registered number.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: forgetpassword sevice
 *         description: An object of forgetpassword service
 *         in: body
 *         required: true  
 *         schema:
 *           $ref: '#/definitions/forgetpasswordRequest' 
 *     responses:
 *       200:
 *         description: login successfull
 *         schema:
 *           $ref: '#/definitions/forgetpasswordRequest'
 */
/**
 * @swagger
 * definitions:
 *   MobileOTPRequest:
 *     properties:
 *       phone:
 *         type: string
 *         example: "abc@xyz.com"

 *
 *   MobileOTPResponse:
 *     properties:
 *       Message:
 *         type: string
 *         example: "abcdef"
 */

 /**
 * @swagger
 * /sendotp:
 *   post:
 *     tags:
 *       - Mobile OTP Services
 *     description: Returns the OTP of the registered number.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: OTP Generation
 *         description: An object of OTP generation
 *         in: body
 *         required: true  
 *         schema:
 *           $ref: '#/definitions/MobileOTPRequest' 
 *     responses:
 *       200:
 *         description: An object of OTP
 *         schema:
 *           $ref: '#/definitions/MobileOTPResponse'
 */