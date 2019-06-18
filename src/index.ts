import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_tutorial_manager extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_tutorial_manager',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('Jupyterlab_tutorial_manager is activated!');
  }
};

export default extension;
