const AppError = (statusCode, errMsg, next) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.isOperational = true;
  err.message = errMsg;
  next(err);
}

const AsyncErrorHandler = (fn) => {
  // 傳入一個異步函式 (async func) 加工後，回傳一個函式。
  // 由於外層函式會作為 callback 使用，將 req, res, next 裡面的 fn 傳送，並利用異步函式的 Promise 特性，將錯誤透過 next 傳送進行統一管理。
  return (req, res, next) => fn(req, res, next).catch(err => next(err));
}

module.exports = {
  AppError,
  AsyncErrorHandler
}