import * as React from "react";
// tslint:disable-next-line
import ReactJoyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { Tutorial } from "./Tutorial";

const DEFAULT_TUTORIAL: Step[] = [
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

interface ITutorialLauncherProps {}

interface ITutorialLauncherState {
  run: boolean;
  runOnStart: boolean;
  tutorial: Tutorial;
}

export default class TutorialLauncher extends React.Component<
  ITutorialLauncherProps,
  ITutorialLauncherState
> {
  private _prevStatus: string;
  constructor(props: ITutorialLauncherProps) {
    super(props);
    this.state = {
      run: false,
      runOnStart: false,
      tutorial: null
    };

    this._prevStatus = STATUS.READY;
    this.handleJoyrideEvents = this.handleJoyrideEvents.bind(this);
    this.launchTutorial = this.launchTutorial.bind(this);
  }

  public async launchTutorial(tutorial: Tutorial): Promise<void> {
    if (!tutorial) {
      throw new Error("The tutorial was null or undefined!");
    }
    if (!tutorial.hasSteps) {
      throw new Error("The tutorial doesn't have any steps!");
    }
    await this.setState({
      run: true,
      tutorial: tutorial
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <ReactJoyride
          run={this.state.run}
          steps={
            this.state.tutorial ? this.state.tutorial.steps : DEFAULT_TUTORIAL
          }
          callback={this.handleJoyrideEvents}
          showSkipButton={true}
          showProgress={true}
          continuous={true}
          spotlightClicks={false}
          scrollToFirstStep={false}
          locale={{
            back: "Back",
            close: "Close",
            last: "Finish",
            next: "Next",
            skip: "Skip"
          }}
        />
      </div>
    );
  }

  private async handleJoyrideEvents(data: CallBackProps): Promise<void> {
    if (!data) {
      return;
    }
    const { status, step } = data;

    // Only interested when status changes
    if (status === this._prevStatus) {
      return;
    }
    // Update previous state
    this._prevStatus = status;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      this.state.tutorial._finished.emit();
      this.setState({ run: false });
    } else if (status === STATUS.RUNNING) {
      this.state.tutorial._started.emit();
    } else if (status === STATUS.ERROR) {
      console.error(`An error occurred with the tutorial at step: ${step}`);
    }
  }
}
