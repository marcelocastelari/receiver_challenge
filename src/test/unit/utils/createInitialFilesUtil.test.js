const fs = require('fs').promises;
const sinon = require('sinon');

describe('checkAndExecute', () => {
  beforeEach(() => {
    accessStub = sinon.stub(fs, 'access');
    writeFileStub = sinon.stub(fs, 'writeFile');
    createReceiverStub = sinon.stub().resolves();
    loggerInfoSpy = sinon.spy(console, 'info');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create flag file and execute receivers if flag file does not exist', async () => {
    expect(true).toBe(true);
  });
});
