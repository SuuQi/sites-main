// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Flag from '../../../app/model/flag';
import Settings from '../../../app/model/settings';
import Unisdk from '../../../app/model/unisdk';

declare module 'egg' {
  interface IModel {
    Flag: ReturnType<typeof Flag>;
    Settings: ReturnType<typeof Settings>;
    Unisdk: ReturnType<typeof Unisdk>;
  }
}
