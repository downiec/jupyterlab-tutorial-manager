import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import "../style/index.css";
import { MainMenu, IMainMenu } from "@jupyterlab/mainmenu";
import ITutorialManager, { TutorialManager } from "./TutorialManager";
import ITutorial from "./Tutorial";
import { Token } from "@phosphor/coreutils";
import { Step, CallBackProps } from "react-joyride";
import Default from "./Defaults";

export const ITutorial = new Token<ITutorial>(
  "@cdat/joyride-tutorial-manager:ITutorial"
);

export const ITutorialManager = new Token<ITutorialManager>(
  "@cdat/joyride-tutorial-manager:TutorialManager"
);

const WELCOME_TUTORIAL: Step[] = [
  {
    content:
      "Welcome to Jupyter Lab! The following tutorial will point out some main UI elements of JupyterLab.",
    placement: "center",
    target: "#jp-main-dock-panel",
    title: "Welcome to Jupyter Lab!",
    locale: { skip: "skip", next: "next", back: "back", last: "finish" }
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

let globalMenu: MainMenu;

/**
 * Initialization data for the jupyterlab_tutorial_manager extension.
 */
const extension: JupyterFrontEndPlugin<ITutorialManager> = {
  activate,
  autoStart: true,
  id: "jupyterlab-tutorial-manager",
  requires: [IMainMenu],
  provides: ITutorialManager
};

function activate(app: JupyterFrontEnd, menu: MainMenu): ITutorialManager {
  // Create tutorial manager
  let tutorialManager = new TutorialManager(app, menu);

  app.started.then(() => {
    // Attach the widget to the main work area if it's not there
    if (!tutorialManager.isAttached) {
      app.shell.add(tutorialManager, "main");
      //testTutorialManager(tutorialManager);
    }
  });

  console.log("Jupyterlab-tutorial-manager is activated!");
  return tutorialManager;
}

/*async function testTutorialManager(
  tutorialManager: ITutorialManager
): Promise<void> {
  let testTutorial = tutorialManager.createTutorial(
    "welcome-tutorial",
    "Welcome Tutorial",
    true
  );
  let testTutorial2 = tutorialManager.createTutorial(
    "welcome-tutorial2",
    "Welcome Tutorial 2",
    false
  );
  let testTutorial3 = tutorialManager.createTutorial(
    "welcome-tutorial3",
    "Welcome Tutorial 3",
    true
  );

  testTutorial.steps = Default.steps();

  testTutorial2.addStep(WELCOME_TUTORIAL[0]);
  testTutorial2.createAndAddStep(
    "#jp-MainMenu",
    "New tutorial step.",
    "center",
    "Test"
  );

  testTutorial3.steps = WELCOME_TUTORIAL;
  testTutorial3.createAndAddStep(
    ".welcome-tutorial3",
    "This is where to click to see this tutorial again.",
    "bottom"
  );
  testTutorial3.createAndAddStep("#jp-MainMenu", "Haha!", "top-start");
  testTutorial3.options.styles.backgroundColor = "#012210";
  testTutorial3.options.styles.overlayColor = "rgba(0, 1, 0, 0.7)";
  testTutorial3.options.styles.primaryColor = "#0F0";
  testTutorial3.options.styles.textColor = "#F80";

  testTutorial.started.connect(handleTutorialStarted);
  testTutorial.finished.connect(handleTutorialFinished);
  testTutorial.skipped.connect(handleTutorialSkipped);
  testTutorial.stepChanged.connect(handleStepChanged);
  testTutorial.options.showProgress = false;
  testTutorial2.started.connect(handleTutorialStarted);
  testTutorial2.finished.connect(handleTutorialFinished);
  testTutorial2.skipped.connect(handleTutorialSkipped);
  testTutorial2.options.showProgress = true;
  testTutorial3.started.connect(handleTutorialStarted);
  testTutorial3.finished.connect(handleTutorialFinished);
  testTutorial3.skipped.connect(handleTutorialSkipped);
  testTutorial3.stepChanged.connect(handleStepChanged);

  await tutorialManager.launch(testTutorial, testTutorial2);
}

function handleStepChanged(tutorial: ITutorial, callback: CallBackProps): void {
  if (tutorial.id === "welcome-tutorial3") {
    console.log(`Step changed. Current index: ${callback.index}`);
    if (callback.index > 1) {
      globalMenu.activeMenu = globalMenu.helpMenu.menu;
      globalMenu.openActiveMenu();
    } else if (callback.index === 2) {
      globalMenu.activeMenu = globalMenu.settingsMenu.menu;
      globalMenu.openActiveMenu();
      //globalMenu.settingsMenu.menu.open(0,0);
    }
  }
}

function handleTutorialStarted(tutorial: ITutorial): void {
  console.log(
    `Tutorial ID: ${tutorial.id} with label: ${tutorial.label}, has started!`
  );
}

function handleTutorialFinished(tutorial: ITutorial): void {
  console.log(
    `Tutorial ID: ${tutorial.id} with label: ${tutorial.label}, has finished!`
  );
  if (tutorial.id === "welcome-tutorial2") {
    tutorial.addTutorialToMenu(globalMenu.settingsMenu.menu);
  }
  if (tutorial.id === "welcome-tutorial3") {
    console.log(tutorial.removeTutorialFromMenu(globalMenu.helpMenu.menu));
  }
}

function handleTutorialSkipped(tutorial: ITutorial): void {
  console.log(`Tutorial: ${tutorial.label} ended early!`);
  console.log(tutorial.removeTutorialFromMenu(globalMenu.settingsMenu.menu));
}*/

export * from "./Tutorial";
export * from "./TutorialManager";
export default extension;
