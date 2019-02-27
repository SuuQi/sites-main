// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHello from '../../../app/controller/hello';
import ExportWechat from '../../../app/controller/wechat';

declare module 'egg' {
  interface IController {
    hello: ExportHello;
    wechat: ExportWechat;
  }
}
