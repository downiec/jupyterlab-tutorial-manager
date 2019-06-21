import { placement, Step } from "react-joyride";
import { Menu } from "@phosphor/widgets";
import { Signal, ISignal } from "@phosphor/signaling";

export default interface ITutorial {
  addStep(step: Step): void;
  addTutorialToMenu(menu: Menu): Menu.IItem;
  createAndAddStep(
    target: string,
    content: string,
    placement?: placement,
    title?: string
  ): Step;
  finished: ISignal<this, void>;
  hasSteps: boolean;
  id: string;
  label: string;
  removeTutorialFromMenu(menu: Menu, item: Menu.IItem): void;
  removeStep(index: number): Step;
  steps: Step[];
  started: ISignal<this, void>;
}

export class Tutorial implements ITutorial {
  public id: string;
  public label: string;

  public _finished: Signal<this, void>;
  public _started: Signal<this, void>;
  private _command: string;
  private _steps: Step[];
  constructor(id: string, command: string, label?: string) {
    this.id = id;
    this._command = command;
    this.label = label;
    this._steps = Array<Step>();
    this._started = new Signal<this, void>(this);
    this._finished = new Signal<this, void>(this);

    this.addStep = this.addStep.bind(this);
    this.addTutorialToMenu = this.addTutorialToMenu.bind(this);
    this.createAndAddStep = this.createAndAddStep.bind(this);
    this.removeTutorialFromMenu = this.removeTutorialFromMenu.bind(this);
    this.removeStep = this.removeStep.bind(this);
  }

  get hasSteps(): boolean {
    return this.steps.length > 0;
  }

  get steps(): Step[] {
    return this._steps;
  }

  set steps(steps: Step[]) {
    this._steps = steps;
  }

  get finished(): ISignal<this, void> {
    return this._finished;
  }

  get started(): ISignal<this, void> {
    return this._started;
  }

  public addStep(step: Step): void {
    if (step) {
      this.steps.push(step);
    }
  }

  public addTutorialToMenu(menu: Menu): Menu.IItem {
    const btnOptions = {
      args: {},
      command: this._command
    };
    return menu.addItem(btnOptions);
  }

  public createAndAddStep(
    target: string,
    content: string,
    placement?: placement,
    title?: string
  ): Step {
    const newStep: Step = {
      title,
      placement,
      target,
      content
    };
    this.addStep(newStep);
    return newStep;
  }

  public removeTutorialFromMenu(menu: Menu, item: Menu.IItem): void {
    menu.removeItem(item);
  }

  public removeStep(index: number): Step {
    if (index < 0 || index >= this.steps.length) {
      return;
    }
    return this.steps.splice(index, 1)[0];
  }
}
