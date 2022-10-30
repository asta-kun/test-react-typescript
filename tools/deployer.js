const { Component } = require('@serverless/core');
const fs = require('fs');

const ENVIRONMENT = ['prod', 'dev'];

class Deploy extends Component {
  async default(inputs = {}) {
    const { stage = 'dev' } = inputs;
    const buildPath = process.cwd() + '/../../dist';

    // remove dist
    if (fs.existsSync(buildPath)) {
      fs.rmdir(
        buildPath,
        {
          recursive: true,
        },
        () => {
          console.log('dist path has been removed.');
        }
      );
    }

    if (ENVIRONMENT.includes(stage)) {
      try {
        require('dotenv').config({ path: `${process.cwd()}/env-${stage}` });
        if (stage == '') throw new Error('error loading stage.');

        const template = await this.load('@serverless/template', stage);
        const output = await template({ template: 'serverless.yml' });
        return output;
      } catch (error) {
        this.context.log(error);
        return process.exit(1);
      }
    } else {
      this.context.log(
        'Valid environment must defined... choices are dev and prod'
      );
      return process.exit(1);
    }
  }

  async destroy(inputs = {}) {
    const { stage = 'dev' } = inputs;

    if (ENVIRONMENT.includes(stage)) {
      const template = await this.load('@serverless/template', stage);
      const output = await template.remove();
      return output;
    } else {
      this.context.log(
        'Valid environment must defined... choices are dev and prod'
      );
    }
  }
}

module.exports = Deploy;
