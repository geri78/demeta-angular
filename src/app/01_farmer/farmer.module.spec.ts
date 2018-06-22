import { FarmerModule } from './farmer.module';

describe('FarmerModule', () => {
  let adminModule: FarmerModule;

  beforeEach(() => {
    adminModule = new FarmerModule();
  });

  it('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});
