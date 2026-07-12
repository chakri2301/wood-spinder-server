import { Hono } from 'hono';
import type { UiResponse } from '@devvit/web/shared';
import { context, reddit, redis } from '@devvit/web/server';
import { error } from 'console';
import { LevelData, LevelPostData } from '../../shared/api'
export const numberOfLevelsKey = 'numberOfLevels';
export const levelDataKey = 'levelHset';
export const postIdLevelkey = 'postIdHset';
type LevelSubmitReq = {
  title?: string;
  levelName?: string;
  levelData?: string;
}
export const forms = new Hono();

forms.post('create-level-submit', async (c) => {
  // Total number of Levels in numberOfLevels
  // HashSet in hset levelHset 
  // LevelId from post id in postIdHset
  try {
    const { title,levelName, levelData } = await c.req.json<LevelSubmitReq>();
    if (levelData == "") {
      throw error("No level");
    }
    const levelPostData : LevelPostData = {
      levelName: levelName ?? ""
    }
    const post = await reddit.submitCustomPost({
      title: title ? title : "New Level",
      postData:levelPostData
    });
    const ldExists = await redis.exists(numberOfLevelsKey);
    if (!ldExists) {
      await redis.set(numberOfLevelsKey, '0');
    }
    if (levelData == null) {
      throw error("Level Data not found");
    }
    const parsedData: LevelData = JSON.parse(levelData);
    const addLevelTransaction = await redis.watch(numberOfLevelsKey);
    const currentNumberOfLevels = await redis.get(numberOfLevelsKey);
    if (currentNumberOfLevels == undefined) {
      throw error("total number of levels not set");
    }
    parsedData.code = currentNumberOfLevels;
    await addLevelTransaction.multi();
    await addLevelTransaction.incrBy(numberOfLevelsKey, 1);
    await addLevelTransaction.hSet(levelDataKey, {
      [currentNumberOfLevels]: JSON.stringify(parsedData)
    });
    await addLevelTransaction.hSet(postIdLevelkey, {
      [post.id]: currentNumberOfLevels
    });
    await addLevelTransaction.exec();
    return c.json<UiResponse>(
      {
        navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
      },
      200
    );
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    return c.json<UiResponse>(
      {
        showToast: 'Failed to create post' + error,
      },
      400
    );
  }
})