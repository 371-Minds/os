// Postiz Manager - Handles social media management through Postiz platform

export class PostizManager {
  constructor(config) {
    this.config = config.integration.postiz;
    this.baseUrl = this.config.baseUrl;
    this.apiKey = this.config.apiKey;
  }

  async createPost(content, platforms, schedule = null) {
    try {
      const response = await fetch(`${this.baseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          content,
          platforms,
          schedule
        })
      });

      if (!response.ok) {
        throw new Error(`Postiz API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async schedulePost(content, platforms, scheduleTime) {
    try {
      const response = await fetch(`${this.baseUrl}/posts/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          content,
          platforms,
          scheduleTime
        })
      });

      if (!response.ok) {
        throw new Error(`Postiz API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  }

  async getAccounts() {
    try {
      const response = await fetch(`${this.baseUrl}/accounts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Postiz API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting accounts:', error);
      throw error;
    }
  }

  async listPosts(limit = 10, offset = 0) {
    try {
      const response = await fetch(`${this.baseUrl}/posts?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Postiz API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error listing posts:', error);
      throw error;
    }
  }

  async getPost(postId) {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Postiz API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  }
}