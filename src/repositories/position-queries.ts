import { PositionEnd } from '../endpoints';
import Position from '../models/entities/Position';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchPosition(
  key: string,
  itemCount: number,
  page: number
): Promise<SearchResult<Position> | undefined> {
  var query = '?itemCount=' + itemCount + '&page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Position>>(PositionEnd.Search + query);
}

export async function getPositions(): Promise<Position[] | undefined> {
  return await httpGet<Position[]>(PositionEnd.GetList);
}

export async function insertPosition(
  position: Position
): Promise<Position | undefined> {
  return await httpPost<Position>(PositionEnd.Insert, position);
}

export async function updatePosition(
  position: Position
): Promise<boolean | undefined> {
  return await httpPut(PositionEnd.Update + '/' + position.id, position);
}

export async function deletePosition(id: number): Promise<boolean | undefined> {
  return await httpDelete(PositionEnd.Delete + '/' + id);
}
