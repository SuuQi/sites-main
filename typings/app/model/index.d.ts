// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHello from '../../../app/model/hello';

declare module 'egg' {
  interface IModel {
    Hello: ReturnType<typeof ExportHello>;
  }
}
