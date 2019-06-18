import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_tutorial_manager extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_tutorial_manager',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_tutorial_manager is activated!');
  }
};

export default extension;
