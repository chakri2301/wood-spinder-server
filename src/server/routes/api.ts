import { Hono } from 'hono';
import { context, redis } from '@devvit/web/server';
import { levelDataKey, numberOfLevelsKey, postIdLevelkey } from './forms';
export const api = new Hono();

api.get('/get-level/:type', async (c) => {
  const type = c.req.param('type');
  let levelNumber = "";
  if (type == 'r') {
    levelNumber = c.req.query('code') ?? '';
  } else if (type == 'c') {
    const code = context.postId ?? "";
    levelNumber = await redis.hGet(postIdLevelkey, code) ?? '0';
  } else {
    const totalLevels = Number.parseInt(await redis.get(numberOfLevelsKey) ?? "0");
    levelNumber = Math.floor(Math.random() * totalLevels).toString();
  }
  try {
    const levelData = await redis.hGet(levelDataKey, levelNumber);
    return c.text(levelData ? levelData : `{"items": 1,"code":"0","type": [0],"data": ["{\\\"x\\\":0,\\\"y\\\":-10,\\\"s\\\":5}"],"end": 25}`);
  } catch (error) {
    console.log(error);
    return c.text(`{"items": 1,"code":"0","type": [0],"data": ["{\"x\":0,\"y\":-10,\"s\":1}"],"end": 25}`);
  }
});
