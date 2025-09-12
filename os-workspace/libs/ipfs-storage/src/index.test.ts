import { 
  IPFSStorage, 
  IPFSStorageImpl 
} from './index';

describe('IPFS Storage', () => {
  it('should define IPFSStorage interface', () => {
    // This is a type-only test, so we just verify the type exists
    const storage: IPFSStorage = new IPFSStorageImpl();
    expect(storage).toBeDefined();
  });

  it('should create IPFSStorageImpl instance', () => {
    const storage = new IPFSStorageImpl();
    expect(storage).toBeInstanceOf(IPFSStorageImpl);
  });
});