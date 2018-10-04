// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Auth from '../../../app/controller/auth';
import Code from '../../../app/controller/code';
import Flag from '../../../app/controller/flag';
import GameSettings from '../../../app/controller/gameSettings';
import Unisdk from '../../../app/controller/unisdk';

declare module 'egg' {
  interface IController {
    auth: Auth;
    code: Code;
    flag: Flag;
    gameSettings: GameSettings;
    unisdk: Unisdk;
  }
}
