export const ResponseHeader = (code, message, result) => {
  return {
    code,
    message,
    result: result || null
  }
}
