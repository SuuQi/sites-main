// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Hello from '../../../app/controller/hello';

declare module 'egg' {
  interface IController {
    hello: Hello;
  }
}
