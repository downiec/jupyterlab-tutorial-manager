import { Step, CallBackProps, placement } from "react-joyride";
import { Menu } from "@phosphor/widgets";
import { ISignal } from "@phosphor/signaling";
import { TutorialOptions } from "./constants";
import { Token } from "@phosphor/coreutils";

export const ITutorial = new Token<ITutorial>(
  "@cdat/jupyterlab-tutorial-manager:ITutorial"
);

export interface ITutorial {
  addStep(step: Step): void;
  addTutorialToMenu(menu: Menu): Menu.IItem;
  createAndAddStep(
    target: string,
    content: string,
    placement?: placement,
    title?: string
  ): Step;
  skipped: ISignal<this, CallBackProps>;
  finished: ISignal<this, CallBackProps>;
  hasSteps: boolean;
  id: string;
  label: string;
  menuButtons: Menu.IItem[];
  options: TutorialOptions;
  removeTutorialFromMenu(menu: Menu): void;
  removeStep(index: number): Step;
  started: ISignal<this, CallBackProps>;
  stepChanged: ISignal<this, CallBackProps>;
  steps: Step[];
}

export const ITutorialManager = new Token<ITutorialManager>(
  "@cdat/jupyterlab-tutorial-manager:ITutorialManager"
);

export interface ITutorialManager {
  createTutorial(id: string, label: string, addToHelpMenu: boolean): ITutorial;
  launch(...tutorials: ITutorial[] | string[]): Promise<void>;
  tutorials: ITutorial[];
}
