/**
 * @api {post} /api/auth/login Login with email and password
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} token valid jwt token with encrypted data
 * @apiSuccess {Object} user User info
 *
 * @apiVersion 1.0.0
 */

// Code is in /src/server/auth/strategies/*
