type Callback = (args?: any) => any;

export const pipeline = (...functions: Callback[]): Callback => {
  return (args) => {
    return functions.reduce((arg, fn) => {
      return fn(arg);
    }, args) as unknown as Response;
  };
};

export const pipelineReverse = (...functions: Callback[]): Callback => {
  return pipeline(...functions.reverse());
};
