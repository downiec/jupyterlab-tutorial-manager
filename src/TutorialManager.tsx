import * as React from "react";
import * as ReactDOM from "react-dom";
import { Widget } from "@phosphor/widgets";
import { MainMenu } from "@jupyterlab/mainmenu";
import { JupyterFrontEnd } from "@jupyterlab/application";
import ErrorBoundary from "./ErrorBoundary";
import TutorialLauncher from "./TutorialLauncher";
import ITutorial, { Tutorial } from "./Tutorial";

export default class TutorialManager extends Widget {
  private app: JupyterFrontEnd;
  private mainDiv: HTMLDivElement; // The main container for this widget
  private menu: MainMenu;
  private _tutorialLauncher: TutorialLauncher;
  private _tutorials: ITutorial[];

  constructor(app: JupyterFrontEnd, menu: MainMenu) {
    super();
    this.app = app;
    this.id = "tutorial-manager";
    this.mainDiv = document.createElement("div");
    this.mainDiv.id = "jupyterlab-tutorial-manager-main";
    this.menu = menu;
    this.node.appendChild(this.mainDiv);
    this._tutorials = Array<ITutorial>();
    this.title.closable = true;

    this.createTutorial = this.createTutorial.bind(this);
    this.launchTutorial = this.launchTutorial.bind(this);

    ReactDOM.render(
      <ErrorBoundary>
        <div id="joyride-tutorial">
          <TutorialLauncher ref={loader => (this._tutorialLauncher = loader)} />
        </div>
      </ErrorBoundary>,
      this.mainDiv
    );
  }

  get tutorials(): ITutorial[] {
    return this._tutorials;
  }

  public createTutorial(
    id: string,
    label: string,
    addToHelpMenu: boolean = true
  ): ITutorial {
    const tutorialExists: boolean = this._tutorials.some(tutorial => {
      return tutorial.id === id;
    });
    if (tutorialExists) {
      throw new Error(
        `Error creating new tutorial. Tutorial id's must be unique.\nTutorial with the id: '${id}' already exists.`
      );
    }

    const commandID: string = `tutorial-manager:${id}`;
    let newTutorial: Tutorial = new Tutorial(id, commandID, label);
    newTutorial;
    this.app.commands.addCommand(commandID, {
      execute: () => {
        // Start the tutorial
        this._tutorialLauncher.launchTutorial(newTutorial);
      },
      label: label
    });

    if (addToHelpMenu) {
      newTutorial.addTutorialToMenu(this.menu.helpMenu.menu);
    }

    this._tutorials.push(newTutorial);

    return newTutorial;
  }

  public launchTutorial(tutorial: ITutorial) {
    this._tutorialLauncher.launchTutorial(tutorial as Tutorial);
  }
}
