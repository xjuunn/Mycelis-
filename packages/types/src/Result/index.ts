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

export class PageResult<T = any> {
  code: number;
  msg: string;
  data: PageResultInfo<T>;
  constructor(data: PageResultInfo<T>, code: number = 200, msg: string = "操作成功") {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}

export class PageResultInfo<T = any> {
  list: T[];
  total: number;
  skip: number;
  take: number;
  constructor(list: T[], total: number, skip: number = 0, take: number = 15) {
    this.list = list;
    this.total = total;
    this.skip = skip;
    this.take = take;
  }
}
