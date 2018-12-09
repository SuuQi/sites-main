// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHello from '../../../app/controller/hello';

declare module 'egg' {
  interface IController {
    hello: ExportHello;
  }
}
