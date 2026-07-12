import { navigateTo, context, requestExpandedMode } from '@devvit/web/client';
import { LevelPostData } from '../shared/api'


const levelText = document.getElementById('level-name') as HTMLParagraphElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
const tutorialButton = document.getElementById('tutorial-button')as HTMLButtonElement;
const levelPostData: LevelPostData = (context.postData as LevelPostData) ?? { levelName: "" };
levelText.innerText = (levelPostData.levelName == "") ? "" : "Level Name:" + levelPostData.levelName;
startButton.addEventListener('click', (e) => {
  requestExpandedMode(e, 'game');
});
tutorialButton.addEventListener('click', (e)=>{
  requestExpandedMode(e, 'tutorial');
})

