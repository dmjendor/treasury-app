import { CreatorModule } from './creator.module';

describe('CreatorModule', () => {
  let creatorModule: CreatorModule;

  beforeEach(() => {
    creatorModule = new CreatorModule();
  });

  it('should create an instance', () => {
    expect(creatorModule).toBeTruthy();
  });
});
