class Logger {
  static l(message: any) {
    console.log(message);
  }
  static e(message: any) {
    console.log("\x1b[31m%s\x1b[0m", message);
  }
  static w(message: any) {
    console.log("\x1b[33m%s\x1b[0m", message);
  }
  static v(message: any) {
    console.log("\x1b[32m%s\x1b[0m", message);
  }
  static p(message: any) {
    console.log("\x1b[35m%s\x1b[0m", message);
  }
}

export default Logger;
