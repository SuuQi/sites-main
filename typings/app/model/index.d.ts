// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Hello from '../../../app/model/hello';

declare module 'egg' {
  interface IModel {
    Hello: ReturnType<typeof Hello>;
  }
}
