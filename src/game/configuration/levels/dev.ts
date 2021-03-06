import {MapCell} from '../../classes/map-cell';
import {Map} from '../../models/map.type';
import {Player} from '../../models/players.type';

export const MAP_DEV: Map = [
  new MapCell(Player.RED, {red: {rock: 10}, blue: null}, true, 20),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(),
  new MapCell(Player.BLUE, {red: null, blue: null}, true, 20),
];
