export const CODE_STATUS = {
  SUCCESSFULL: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NOT_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMET_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENT: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVALIABLE: 503
}

export const MESSAGE_TYPE = Object.freeze({
  SUCCESSFULL: 'Successfully operation',
  CREATED: 'Created Successfull',
  UPDATED: 'Updated Successfull',
  DELETED: 'DELETED Successfull',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not found',
  BAD_PASS: 'Password Incorrect',
  NOT_TOKEN_PROVIDE: 'No token provide',
  INVALID_TOKEN_PROVIDE: 'Invalid token format',
  NOT_EXISTS: 'NOT EXISTS',
  ALREADY_EXISTS: 'Already exists',
  UNAUTHICATED: 'Require be member of system',
  INVALID_ID: 'Invalid Id'
})
