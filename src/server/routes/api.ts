import { Hono } from 'hono';
import { LevelData } from '../../shared/api'
export const api = new Hono();

// api.get('/init', async (c) => {
//   const { postId } = context;

//   if (!postId) {
//     console.error('API Init Error: postId not found in devvit context');
//     return c.json<ErrorResponse>(
//       {
//         status: 'error',
//         message: 'postId is required but missing from context',
//       },
//       400
//     );
//   }

//   try {
//     const username = await reddit.getCurrentUsername();
//     const currentUsername = username ?? 'anonymous';

//     let snoovatarUrl = '';
//     if (username && context.userId) {
//       const user = await reddit.getUserById(context.userId);
//       if (user) {
//         snoovatarUrl = (await user.getSnoovatarUrl()) ?? '';
//       }
//     }

//     const redisKey = `${postId}:${currentUsername}`;
//     const previousTime = await redis.get(redisKey);

//     return c.json<InitResponse>({
//       type: 'init',
//       postId: postId,
//       username: currentUsername,
//       snoovatarUrl: snoovatarUrl,
//       previousTime: previousTime ?? '',
//     });
//   } catch (error) {
//     console.error(`API Init Error for post ${postId}:`, error);
//     let errorMessage = 'Unknown error during initialization';
//     if (error instanceof Error) {
//       errorMessage = `Initialization failed: ${error.message}`;
//     }
//     return c.json<ErrorResponse>(
//       { status: 'error', message: errorMessage },
//       400
//     );
//   }
// });

// api.post('/level-completed', async (c) => {
//   const { postId } = context;

//   if (!postId) {
//     console.error('No postId in context');
//     return c.json<ErrorResponse>(
//       {
//         status: 'error',
//         message: 'postId is required',
//       },
//       400
//     );
//   }

//   let body: LevelCompletedRequest;
//   try {
//     body = await c.req.json<LevelCompletedRequest>();
//   } catch (error) {
//     console.error('Invalid JSON body for level-completed', error);
//     return c.json<ErrorResponse>(
//       {
//         status: 'error',
//         message: 'Invalid JSON body',
//       },
//       400
//     );
//   }

//   try {
//     const { username, time } = body;

//     if (!username || !time) {
//       console.error('Missing username or time in request');
//       return c.json<ErrorResponse>(
//         {
//           status: 'error',
//           message: 'username and time are required',
//         },
//         400
//       );
//     }

//     const redisKey = `${postId}:${username}`;
//     await redis.set(redisKey, time);

//     return c.json<LevelCompletedResponse>({
//       type: 'level-completed',
//       success: true,
//       message: 'Time saved successfully',
//     });
//   } catch (error) {
//     console.error(`API Level Completed Error for post ${postId}:`, error);
//     let errorMessage = 'Unknown error saving completion time';
//     if (error instanceof Error) {
//       errorMessage = `Failed to save time: ${error.message}`;
//     }
//     return c.json<LevelCompletedResponse>(
//       {
//         type: 'level-completed',
//         success: false,
//         message: errorMessage,
//       },
//       500
//     );
//   }
// });
api.get('/get-basic-level/:id', async (c) => {
  let id = c.req.param('id');
  if (id == 'qxafref') {
    return c.json<LevelData>({
      items: 1,
      type: [5],
      data: ["{\"x\":0,\"y\":-10,\"s\":5,\"pos\": [0,0,0,2],\"time\": 4}"],
      end: 25,
    })
  }else{
    return c.json<LevelData>({
      items: 1,
      type: [0],
      data: ["{\"x\":0,\"y\":-10,\"s\":5}"],
      end: 25,
    })
  }
});
