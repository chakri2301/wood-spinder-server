import { Hono } from 'hono';
import type { MenuItemRequest, UiResponse } from '@devvit/web/shared';

export const menu = new Hono();

menu.post('/post-new-game', async (c) => {
  return c.json<UiResponse>({
    showForm:{
      name:'createLevelForm',
      form:{
        fields:[
          {
            type:'string',
            name:'title',
            label:'Enter a title for the post'
          },
          {
            type:'string',
            name:'levelName',
            label:'Enter a Name for level'
          },
          {
            type:'paragraph',
            name:'levelData',
            label:'Enter Json'
          }
        ]
      }
    }
  });
});