// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHello from '../../../app/controller/hello';
import ExportReaderUser from '../../../app/controller/readerUser';
import ExportWechat from '../../../app/controller/wechat';

declare module 'egg' {
  interface IController {
    hello: ExportHello;
    readerUser: ExportReaderUser;
    wechat: ExportWechat;
  }
}
