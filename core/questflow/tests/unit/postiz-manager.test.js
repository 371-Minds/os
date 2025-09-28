// Postiz Manager Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PostizManager } from '../../src/agents/postiz-manager.js';

// Mock fetch globally
global.fetch = vi.fn();

describe('PostizManager', () => {
  let postizManager;
  let mockConfig;

  beforeEach(() => {
    mockConfig = {
      integration: {
        postiz: {
          apiKey: 'test-api-key',
          baseUrl: 'https://api.postiz.com/v1'
        }
      }
    };
    postizManager = new PostizManager(mockConfig);
    fetch.mockClear();
  });

  it('should initialize with correct configuration', () => {
    expect(postizManager.config).toEqual(mockConfig.integration.postiz);
    expect(postizManager.baseUrl).toBe('https://api.postiz.com/v1');
    expect(postizManager.apiKey).toBe('test-api-key');
  });

  it('should create a post successfully', async () => {
    const mockResponse = {
      id: 'post-123',
      content: 'Test post',
      status: 'created'
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await postizManager.createPost('Test post', ['twitter', 'facebook']);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.postiz.com/v1/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key'
        },
        body: JSON.stringify({
          content: 'Test post',
          platforms: ['twitter', 'facebook'],
          schedule: null
        })
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('should handle create post error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request'
    });

    await expect(postizManager.createPost('Test post', ['twitter']))
      .rejects
      .toThrow('Postiz API error: 400 Bad Request');
  });

  it('should schedule a post successfully', async () => {
    const mockResponse = {
      id: 'post-456',
      content: 'Scheduled post',
      status: 'scheduled',
      scheduleTime: '2023-12-31T12:00:00Z'
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await postizManager.schedulePost(
      'Scheduled post',
      ['twitter', 'linkedin'],
      '2023-12-31T12:00:00Z'
    );

    expect(result).toEqual(mockResponse);
  });

  it('should get accounts successfully', async () => {
    const mockAccounts = [
      { id: 'acc-1', platform: 'twitter', name: 'Twitter Account' },
      { id: 'acc-2', platform: 'facebook', name: 'Facebook Account' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAccounts
    });

    const result = await postizManager.getAccounts();

    expect(result).toEqual(mockAccounts);
  });

  it('should list posts successfully', async () => {
    const mockPosts = [
      { id: 'post-1', content: 'Post 1', status: 'published' },
      { id: 'post-2', content: 'Post 2', status: 'scheduled' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts
    });

    const result = await postizManager.listPosts(10, 0);

    expect(result).toEqual(mockPosts);
  });

  it('should get a specific post successfully', async () => {
    const mockPost = {
      id: 'post-1',
      content: 'Test Post',
      status: 'published',
      platforms: ['twitter']
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost
    });

    const result = await postizManager.getPost('post-1');

    expect(result).toEqual(mockPost);
  });
});