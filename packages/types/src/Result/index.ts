export class Result<T = any> {
  code: number;
  msg: string;
  data: T;
  constructor(data: T, code: number = 200, msg: string = "操作成功") {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
