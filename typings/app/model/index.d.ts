// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportReaderUser from '../../../app/model/readerUser';

declare module 'egg' {
  interface IModel {
    ReaderUser: ReturnType<typeof ExportReaderUser>;
  }
}
