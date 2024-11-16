export class ApiResponseEntity<T> {
  code: number;
  msg: string;
  data: T;
  timestamp: number;

  constructor(code: number, msg: string, data: T, timestamp: number) {
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.timestamp = timestamp;
  }

  // 判断响应是否成功
  isSuccess(): boolean {
    return this.code === 200;
  }
}
