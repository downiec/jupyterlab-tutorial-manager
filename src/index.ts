import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import "../style/index.css";
import { MainMenu, IMainMenu } from "@jupyterlab/mainmenu";
import TutorialManager from "./TutorialManager";
import { placement, Step } from "react-joyride";
import ITutorial from "./Tutorial";

const WELCOME_TUTORIAL: Step[] = [
  {
    content:
      "Welcome to Jupyter Lab! The following tutorial will point out some main UI elements of JupyterLab.",
    placement: "center",
    target: "#jp-main-dock-panel",
    title: "Welcome to Jupyter Lab!"
  },
  {
    content:
      "This is the main content area where notebooks and other content can be viewed and edited.",
    placement: "left",
    target: "#jp-main-dock-panel",
    title: "Main Content"
  },
  {
    content: `This is the top menu bar.`,
    placement: "bottom",
    target: "#jp-MainMenu",
    title: "Main Menu Options"
  }
];

/**
 * Initialization data for the jupyterlab_tutorial_manager extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  activate,
  autoStart: true,
  id: "jupyterlab-tutorial-manager",
  requires: [IMainMenu]
};

let tutorialManager: TutorialManager;

function activate(app: JupyterFrontEnd, menu: MainMenu): void {
  // Create tutorial manager
  tutorialManager = new TutorialManager(app, menu);

  app.started.then(() => {
    // Attach the widget to the main work area if it's not there
    if (!tutorialManager.isAttached) {
      app.shell.add(tutorialManager, "main");
      testTutorialManager();
    }
  });

  console.log("Jupyterlab-tutorial-manager is activated!");
}

function testTutorialManager() {
  let testTutorial = tutorialManager.createTutorial(
    "welcome-tutorial",
    "Welcome Tutorial",
    true
  );
  testTutorial.addStep(WELCOME_TUTORIAL[0]);
  testTutorial.createAndAddStep(
    "#jp-MainMenu",
    "New tutorial step.",
    "center",
    "Test"
  );
  testTutorial.started.connect(handleTutorialStarted);
  testTutorial.finished.connect(handleTutorialFinished);
  tutorialManager.launchTutorial(testTutorial);
  testTutorial.steps = WELCOME_TUTORIAL;

  tutorialManager.launchTutorial(testTutorial);
}

function handleTutorialStarted(tutorial: ITutorial) {
  console.log(
    `Tutorial ID: ${tutorial.id} with label: ${tutorial.label}, has started!`
  );
}

function handleTutorialFinished(tutorial: ITutorial) {
  console.log(
    `Tutorial ID: ${tutorial.id} with label: ${tutorial.label}, has ended!`
  );
}

export default extension;
