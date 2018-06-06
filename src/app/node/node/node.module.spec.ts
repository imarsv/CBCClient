import { NodeModule } from './node.module';

describe('NodeModule', () => {
  let nodeModule: NodeModule;

  beforeEach(() => {
    nodeModule = new NodeModule();
  });

  it('should create an instance', () => {
    expect(nodeModule).toBeTruthy();
  });
});
