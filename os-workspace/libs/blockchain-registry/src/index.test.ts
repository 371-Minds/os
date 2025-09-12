import { 
  BlockchainRegistryProvider, 
  BlockchainRegistryProviderImpl 
} from './index';

describe('Blockchain Registry', () => {
  it('should define BlockchainRegistryProvider interface', () => {
    // This is a type-only test, so we just verify the type exists
    const provider: BlockchainRegistryProvider = new BlockchainRegistryProviderImpl();
    expect(provider).toBeDefined();
  });

  it('should create BlockchainRegistryProviderImpl instance', () => {
    const provider = new BlockchainRegistryProviderImpl();
    expect(provider).toBeInstanceOf(BlockchainRegistryProviderImpl);
  });
});