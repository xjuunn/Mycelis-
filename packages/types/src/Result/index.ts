export class Result {
  code: number;
  msg: string;
  data: any;
  constructor(data: any, code: number = 200, msg: string = "操作成功") {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
