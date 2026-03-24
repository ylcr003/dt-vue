/** 请求结果状态码枚举 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TOKEN_EXPIRED = 401,
}

/** 内容类型枚举 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/** 请求方法枚举 */
export enum RequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
