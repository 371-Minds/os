/**
 * Vision Processor - Multimodal Image Analysis
 *
 * Optimized for NVIDIA 4060 GPU with local Ollama vision models
 * Supports image analysis, OCR, object detection, and scene understanding
 */

import type { OllamaClient, VisionGenerationOptions } from './ollama-client.js';
import type {
  DetectedObject,
  ExecutionMetrics,
  ImageInput,
  TaskContext,
  VisionAnalysisResult,
} from './types.js';

/** Vision processing modes */
export type VisionMode =
  | 'general' // General scene description
  | 'detailed' // Detailed analysis
  | 'objects' // Object detection focus
  | 'text' // OCR / text extraction
  | 'comparison' // Compare multiple images
  | 'code' // Analyze code screenshots
  | 'diagram' // Understand diagrams/charts
  | 'creative'; // Creative interpretation

/** Vision analysis request */
export interface VisionAnalysisRequest {
  /** Images to analyze */
  images: ImageInput[];
  /** Analysis mode */
  mode: VisionMode;
  /** Custom prompt (optional) */
  customPrompt?: string;
  /** Specific questions to answer */
  questions?: string[];
  /** Output language */
  language?: string;
  /** Enable detailed object detection */
  enableObjectDetection?: boolean;
  /** Enable text extraction */
  enableOCR?: boolean;
}

/** Batch analysis result */
export interface BatchAnalysisResult {
  /** Individual results */
  results: VisionAnalysisResult[];
  /** Aggregated summary */
  summary: string;
  /** Total processing time */
  totalTimeMs: number;
  /** Overall success */
  success: boolean;
}

/** Image comparison result */
export interface ImageComparisonResult {
  /** Comparison success */
  success: boolean;
  /** Similarities between images */
  similarities: string[];
  /** Differences between images */
  differences: string[];
  /** Detailed comparison */
  detailedAnalysis: string;
  /** Confidence score */
  confidence: number;
  /** Processing time */
  processingTimeMs: number;
}

export class VisionProcessor {
  private ollamaClient: OllamaClient;
  private visionModel: string;
  private defaultOptions: Partial<VisionGenerationOptions>;
  private processingQueue: Map<string, Promise<VisionAnalysisResult>> =
    new Map();

  constructor(
    ollamaClient: OllamaClient,
    visionModel: string,
    options?: Partial<VisionGenerationOptions>,
  ) {
    this.ollamaClient = ollamaClient;
    this.visionModel = visionModel;
    this.defaultOptions = options || {};
  }

  /**
   * Analyze a single image
   */
  async analyzeImage(
    image: ImageInput,
    mode: VisionMode = 'general',
    customPrompt?: string,
  ): Promise<VisionAnalysisResult> {
    const prompt = customPrompt || this.getModePrompt(mode);

    const options: VisionGenerationOptions = {
      model: this.visionModel,
      images: [image],
      analysisFocus:
        mode === 'objects'
          ? 'objects'
          : mode === 'text'
            ? 'text'
            : mode === 'detailed'
              ? 'detailed'
              : 'general',
      temperature: 0.3,
      maxTokens: 1024,
      ...this.defaultOptions,
    };

    return await this.ollamaClient.analyzeImage(image, prompt, options);
  }

  /**
   * Analyze multiple images in batch
   */
  async analyzeBatch(
    request: VisionAnalysisRequest,
  ): Promise<BatchAnalysisResult> {
    const startTime = Date.now();
    const results: VisionAnalysisResult[] = [];

    // Process images concurrently with limit
    const batchSize = 3; // Limit concurrent processing for NVIDIA 4060
    for (let i = 0; i < request.images.length; i += batchSize) {
      const batch = request.images.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((img) =>
          this.analyzeImage(img, request.mode, request.customPrompt),
        ),
      );
      results.push(...batchResults);
    }

    // Generate summary
    const summary = await this.generateBatchSummary(results, request.mode);

    return {
      results,
      summary,
      totalTimeMs: Date.now() - startTime,
      success: results.every((r) => r.success),
    };
  }

  /**
   * Compare two or more images
   */
  async compareImages(
    images: ImageInput[],
    aspectsToCompare?: string[],
  ): Promise<ImageComparisonResult> {
    if (images.length < 2) {
      throw new Error('At least 2 images are required for comparison');
    }

    const startTime = Date.now();

    // Build comparison prompt
    const aspects = aspectsToCompare?.length
      ? `Focus on these aspects: ${aspectsToCompare.join(', ')}`
      : 'Compare all visible aspects';

    const prompt = `Compare these ${images.length} images carefully.
${aspects}

For each comparison, identify:
1. Key similarities (things that are the same or similar)
2. Notable differences (things that are different)
3. Overall assessment

Be specific and detailed in your analysis.`;

    // Analyze each image first
    const analyses = await Promise.all(
      images.map((img) => this.analyzeImage(img, 'detailed')),
    );

    // Generate comparison using chat with context
    const messages = [
      {
        role: 'system' as const,
        content:
          'You are an expert at analyzing and comparing images. Provide detailed, accurate comparisons.',
      },
      {
        role: 'user' as const,
        content: prompt,
        images,
      },
    ];

    const options: VisionGenerationOptions = {
      model: this.visionModel,
      images,
      temperature: 0.3,
      maxTokens: 1500,
    };

    const { response } = await this.ollamaClient.chatWithVision(
      messages,
      options,
    );

    // Parse the comparison response
    const comparison = this.parseComparisonResponse(response);

    return {
      ...comparison,
      processingTimeMs: Date.now() - startTime,
    };
  }

  /**
   * Extract text from image (OCR)
   */
  async extractText(image: ImageInput): Promise<{
    text: string;
    confidence: number;
    structured: boolean;
    processingTimeMs: number;
  }> {
    const startTime = Date.now();

    const prompt = `Extract ALL text visible in this image.

Instructions:
1. Read every piece of text you can see
2. Preserve the layout and structure as much as possible
3. Include headers, labels, captions, and small text
4. If text is unclear, indicate with [unclear]
5. Format tables if present

Output the extracted text:`;

    const result = await this.analyzeImage(image, 'text', prompt);

    return {
      text: result.extractedText || result.sceneDescription,
      confidence: result.confidence,
      structured: this.isStructuredText(result.extractedText || ''),
      processingTimeMs: Date.now() - startTime,
    };
  }

  /**
   * Analyze code from screenshot
   */
  async analyzeCodeScreenshot(image: ImageInput): Promise<{
    code: string;
    language: string;
    analysis: string;
    suggestions: string[];
    processingTimeMs: number;
  }> {
    const startTime = Date.now();

    const prompt = `This image contains code. Analyze it thoroughly:

1. First, extract the exact code shown in the image
2. Identify the programming language
3. Explain what the code does
4. Identify any bugs, issues, or improvements

Format your response as:
LANGUAGE: [detected language]
CODE:
\`\`\`
[extracted code]
\`\`\`
ANALYSIS: [what the code does]
SUGGESTIONS: [improvements or fixes]`;

    const result = await this.analyzeImage(image, 'code', prompt);
    const parsed = this.parseCodeAnalysis(result.sceneDescription);

    return {
      ...parsed,
      processingTimeMs: Date.now() - startTime,
    };
  }

  /**
   * Understand diagram or chart
   */
  async analyzeDiagram(image: ImageInput): Promise<{
    type: string;
    elements: string[];
    relationships: string[];
    interpretation: string;
    dataPoints?: Array<{ label: string; value: string }>;
    processingTimeMs: number;
  }> {
    const startTime = Date.now();

    const prompt = `Analyze this diagram, chart, or visualization:

1. What type of diagram/chart is this? (flowchart, bar chart, pie chart, UML, etc.)
2. What elements are shown? (nodes, bars, sections, etc.)
3. What relationships or connections exist?
4. What is the main message or data being communicated?
5. If it's a data chart, what are the key data points?

Provide a structured analysis.`;

    const result = await this.analyzeImage(image, 'diagram', prompt);
    const parsed = this.parseDiagramAnalysis(result.sceneDescription);

    return {
      ...parsed,
      processingTimeMs: Date.now() - startTime,
    };
  }

  /**
   * Answer specific questions about an image
   */
  async answerQuestions(
    image: ImageInput,
    questions: string[],
  ): Promise<{
    answers: Array<{ question: string; answer: string; confidence: number }>;
    processingTimeMs: number;
  }> {
    const startTime = Date.now();

    const questionList = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');

    const prompt = `Look at this image and answer the following questions:

${questionList}

For each question:
- Provide a clear, direct answer
- Base your answer only on what you can see in the image
- If you can't determine the answer, say so

Format: Answer each question numbered to match the question.`;

    const result = await this.analyzeImage(image, 'detailed', prompt);
    const answers = this.parseQuestionAnswers(
      result.sceneDescription,
      questions,
    );

    return {
      answers,
      processingTimeMs: Date.now() - startTime,
    };
  }

  /**
   * Creative interpretation of image
   */
  async getCreativeInterpretation(image: ImageInput): Promise<{
    interpretation: string;
    mood: string;
    themes: string[];
    story: string;
    processingTimeMs: number;
  }> {
    const startTime = Date.now();

    const prompt = `Provide a creative interpretation of this image:

1. What mood or feeling does this image evoke?
2. What themes or ideas does it represent?
3. Create a short story or narrative inspired by this image (2-3 paragraphs)
4. What artistic or creative elements stand out?

Be imaginative and expressive in your interpretation.`;

    const result = await this.analyzeImage(image, 'creative', prompt);
    const parsed = this.parseCreativeInterpretation(result.sceneDescription);

    return {
      ...parsed,
      processingTimeMs: Date.now() - startTime,
    };
  }

  /**
   * Get mode-specific prompt
   */
  private getModePrompt(mode: VisionMode): string {
    const prompts: Record<VisionMode, string> = {
      general: 'Describe what you see in this image in detail.',
      detailed:
        'Provide a comprehensive analysis of this image including all visible elements, colors, composition, and any notable details.',
      objects:
        'List and describe all objects visible in this image with their approximate locations.',
      text: 'Extract and transcribe all text visible in this image.',
      comparison:
        'Analyze this image for comparison purposes, noting key distinguishing features.',
      code: 'Analyze this code screenshot, extracting the code and explaining its functionality.',
      diagram:
        'Analyze this diagram or chart, explaining its structure and meaning.',
      creative:
        'Provide a creative and expressive interpretation of this image.',
    };

    return prompts[mode];
  }

  /**
   * Generate summary for batch analysis
   */
  private async generateBatchSummary(
    results: VisionAnalysisResult[],
    mode: VisionMode,
  ): Promise<string> {
    if (results.length === 0) return 'No images analyzed.';
    if (results.length === 1) return results[0].sceneDescription;

    const descriptions = results
      .map((r, i) => `Image ${i + 1}: ${r.caption}`)
      .join('\n');

    const summaryPrompt = `Summarize these ${results.length} image analyses:

${descriptions}

Provide a cohesive summary that captures the key points from all images.`;

    const { response } = await this.ollamaClient.generateText(summaryPrompt, {
      model: this.visionModel
        .replace('-vision', '')
        .replace('llava', 'llama3.2'),
      temperature: 0.4,
      maxTokens: 500,
    });

    return response;
  }

  /**
   * Parse comparison response
   */
  private parseComparisonResponse(response: string): {
    success: boolean;
    similarities: string[];
    differences: string[];
    detailedAnalysis: string;
    confidence: number;
  } {
    const similarities: string[] = [];
    const differences: string[] = [];

    // Extract similarities
    const simMatch = response.match(
      /similarities?:?([\s\S]*?)(?:differences?|$)/i,
    );
    if (simMatch) {
      const simLines = simMatch[1].match(/[-•]\s*(.+)/g);
      if (simLines) {
        similarities.push(...simLines.map((l) => l.replace(/^[-•]\s*/, '')));
      }
    }

    // Extract differences
    const diffMatch = response.match(
      /differences?:?([\s\S]*?)(?:overall|assessment|$)/i,
    );
    if (diffMatch) {
      const diffLines = diffMatch[1].match(/[-•]\s*(.+)/g);
      if (diffLines) {
        differences.push(...diffLines.map((l) => l.replace(/^[-•]\s*/, '')));
      }
    }

    return {
      success: true,
      similarities,
      differences,
      detailedAnalysis: response,
      confidence: 0.85,
    };
  }

  /**
   * Check if extracted text appears structured
   */
  private isStructuredText(text: string): boolean {
    // Check for table-like patterns, lists, or formatted content
    const patterns = [
      /\|.*\|/, // Table separators
      /\d+\.\s+/, // Numbered lists
      /[-•]\s+/, // Bullet points
      /\t/, // Tabs
      /:\s+\w+/, // Key-value pairs
    ];

    return patterns.some((p) => p.test(text));
  }

  /**
   * Parse code analysis response
   */
  private parseCodeAnalysis(response: string): {
    code: string;
    language: string;
    analysis: string;
    suggestions: string[];
  } {
    const languageMatch = response.match(/LANGUAGE:\s*(\w+)/i);
    const codeMatch = response.match(/```[\w]*\n([\s\S]*?)```/);
    const analysisMatch = response.match(
      /ANALYSIS:\s*([\s\S]*?)(?:SUGGESTIONS:|$)/i,
    );
    const suggestionsMatch = response.match(/SUGGESTIONS:\s*([\s\S]*?)$/i);

    const suggestions: string[] = [];
    if (suggestionsMatch) {
      const suggestionLines = suggestionsMatch[1].match(/[-•\d.]\s*(.+)/g);
      if (suggestionLines) {
        suggestions.push(
          ...suggestionLines.map((l) => l.replace(/^[-•\d.]\s*/, '')),
        );
      }
    }

    return {
      code: codeMatch ? codeMatch[1].trim() : 'Could not extract code',
      language: languageMatch ? languageMatch[1] : 'unknown',
      analysis: analysisMatch ? analysisMatch[1].trim() : response,
      suggestions,
    };
  }

  /**
   * Parse diagram analysis response
   */
  private parseDiagramAnalysis(response: string): {
    type: string;
    elements: string[];
    relationships: string[];
    interpretation: string;
    dataPoints?: Array<{ label: string; value: string }>;
  } {
    // Extract diagram type
    const typeMatch = response.match(/type[:\s]+(\w+(?:\s+\w+)*)/i);
    const type = typeMatch ? typeMatch[1] : 'unknown';

    // Extract elements
    const elements: string[] = [];
    const elementsMatch = response.match(
      /elements?[:\s]+([\s\S]*?)(?:relationships?|connections?|message|$)/i,
    );
    if (elementsMatch) {
      const elementLines = elementsMatch[1].match(/[-•]\s*(.+)/g);
      if (elementLines) {
        elements.push(...elementLines.map((l) => l.replace(/^[-•]\s*/, '')));
      }
    }

    // Extract relationships
    const relationships: string[] = [];
    const relMatch = response.match(
      /(?:relationships?|connections?)[:\s]+([\s\S]*?)(?:message|interpretation|$)/i,
    );
    if (relMatch) {
      const relLines = relMatch[1].match(/[-•]\s*(.+)/g);
      if (relLines) {
        relationships.push(...relLines.map((l) => l.replace(/^[-•]\s*/, '')));
      }
    }

    return {
      type,
      elements,
      relationships,
      interpretation: response,
    };
  }

  /**
   * Parse question answers
   */
  private parseQuestionAnswers(
    response: string,
    questions: string[],
  ): Array<{ question: string; answer: string; confidence: number }> {
    const answers: Array<{
      question: string;
      answer: string;
      confidence: number;
    }> = [];

    for (let i = 0; i < questions.length; i++) {
      const questionNum = i + 1;
      const pattern = new RegExp(
        `${questionNum}[.):]*\\s*([\\s\\S]*?)(?=${questionNum + 1}[.):]*\\s|$)`,
        'i',
      );
      const match = response.match(pattern);

      answers.push({
        question: questions[i],
        answer: match ? match[1].trim() : 'Could not determine answer',
        confidence: match ? 0.8 : 0.3,
      });
    }

    return answers;
  }

  /**
   * Parse creative interpretation
   */
  private parseCreativeInterpretation(response: string): {
    interpretation: string;
    mood: string;
    themes: string[];
    story: string;
  } {
    const moodMatch = response.match(/mood[:\s]*([\w\s,]+)/i);
    const themesMatch = response.match(
      /themes?[:\s]*([\s\S]*?)(?:story|narrative|$)/i,
    );
    const storyMatch = response.match(/(?:story|narrative)[:\s]*([\s\S]*?)$/i);

    const themes: string[] = [];
    if (themesMatch) {
      const themeItems = themesMatch[1].match(/[-•]\s*(.+)|(\w+(?:\s+\w+)*)/g);
      if (themeItems) {
        themes.push(...themeItems.map((t) => t.replace(/^[-•]\s*/, '').trim()));
      }
    }

    return {
      interpretation: response,
      mood: moodMatch ? moodMatch[1].trim() : 'contemplative',
      themes: themes.slice(0, 5),
      story: storyMatch ? storyMatch[1].trim() : response,
    };
  }

  /**
   * Get processing statistics
   */
  getStats(): {
    queueSize: number;
    model: string;
  } {
    return {
      queueSize: this.processingQueue.size,
      model: this.visionModel,
    };
  }
}
