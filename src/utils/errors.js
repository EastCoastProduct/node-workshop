'use strict';
/**
 * Custom error
 * status and message arguments are mandatory, error handler will throw
 * Error if they are not found
 * debug info is optional data that can help user for debugging
 */
function CustomError(status, message, debugInfo) {
  Error.call(this, message);
  this.message = message;
  this.status = status;
  if (debugInfo) this.debugInfo = debugInfo;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

// Base error that takes care of creating new error object
// and is used by other shortcut error functions
function BaseError(status, message, debug) {
  return new CustomError(status, message, debug);
}

function Error400(message, debug) {
  return BaseError(400, message, debug);
}


module.exports = {
  BaseError: BaseError,
  Error400: Error400
};
