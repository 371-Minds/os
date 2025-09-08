/**
 * ReaderConstellation.tsx - Galaxy Engine Universe Prototype
 *
 * Revolutionary proof-of-concept demonstrating the Galaxy Engine paradigm where
 * applications become explorable universes. This component transforms a simple
 * reading list into an interactive constellation of knowledge.
 *
 * Each book becomes a star, genres form constellations, and reading becomes
 * a journey through the knowledge universe.
 */

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './ReaderConstellation.css';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  readPages: number;
  rating?: number;
  tags: string[];
  color: string;
  position: { x: number; y: number };
  connections: string[];
  insights: string[];
  lastRead?: Date;
}

interface Constellation {
  id: string;
  name: string;
  genre: string;
  books: string[];
  centerPosition: { x: number; y: number };
  brightness: number;
}

interface UniverseState {
  zoomLevel: number;
  centerPosition: { x: number; y: number };
  selectedBook: string | null;
  hoveredBook: string | null;
  activeConstellation: string | null;
  viewMode: 'universe' | 'constellation' | 'book';
  animationSpeed: number;
}

interface ReadersConstellationProps {
  userId?: string;
  onBookSelect?: (book: Book) => void;
  onReadingProgress?: (bookId: string, pages: number) => void;
  onInsightCapture?: (bookId: string, insight: string) => void;
}

export const ReadersConstellation: React.FC<ReadersConstellationProps> = ({
  userId = 'reader-user',
  onBookSelect,
  onReadingProgress,
  onInsightCapture,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Sample book data for the universe
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Andy Hunt & Dave Thomas',
      genre: 'Technology',
      pages: 352,
      readPages: 280,
      rating: 5,
      tags: ['programming', 'best-practices', 'career'],
      color: '#3b82f6',
      position: { x: 300, y: 200 },
      connections: ['2', '3'],
      insights: [
        'Code is a craft, not just engineering',
        'DRY principle transforms development',
      ],
      lastRead: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      genre: 'Technology',
      pages: 432,
      readPages: 150,
      rating: 4,
      tags: ['architecture', 'design-patterns', 'software-engineering'],
      color: '#10b981',
      position: { x: 450, y: 150 },
      connections: ['1', '4'],
      insights: [
        'Dependencies should point inward',
        'Architecture screams the intent',
      ],
      lastRead: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Development',
      pages: 320,
      readPages: 320,
      rating: 5,
      tags: ['habits', 'productivity', 'behavior'],
      color: '#f59e0b',
      position: { x: 200, y: 300 },
      connections: ['1', '5'],
      insights: ['1% better every day compounds', 'Systems beat goals'],
      lastRead: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      genre: 'Design',
      pages: 368,
      readPages: 200,
      rating: 4,
      tags: ['ux-design', 'psychology', 'usability'],
      color: '#ec4899',
      position: { x: 500, y: 300 },
      connections: ['2', '6'],
      insights: ['Good design is invisible', 'Affordances guide behavior'],
      lastRead: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '5',
      title: 'Deep Work',
      author: 'Cal Newport',
      genre: 'Productivity',
      pages: 304,
      readPages: 100,
      rating: 4,
      tags: ['focus', 'productivity', 'attention'],
      color: '#7c3aed',
      position: { x: 150, y: 400 },
      connections: ['3', '7'],
      insights: ['Shallow work is the enemy of meaningful progress'],
      lastRead: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '6',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      genre: 'Psychology',
      pages: 499,
      readPages: 250,
      rating: 5,
      tags: ['psychology', 'decision-making', 'behavioral-economics'],
      color: '#06b6d4',
      position: { x: 550, y: 400 },
      connections: ['4', '8'],
      insights: [
        'System 1 is fast, System 2 is deliberate',
        'Biases shape all decisions',
      ],
      lastRead: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: '7',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      genre: 'Business',
      pages: 336,
      readPages: 50,
      rating: 3,
      tags: ['startup', 'entrepreneurship', 'innovation'],
      color: '#ef4444',
      position: { x: 100, y: 500 },
      connections: ['5'],
      insights: ['Build-Measure-Learn is the core cycle'],
      lastRead: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: '8',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'History',
      pages: 464,
      readPages: 464,
      rating: 5,
      tags: ['history', 'anthropology', 'civilization'],
      color: '#84cc16',
      position: { x: 600, y: 500 },
      connections: ['6'],
      insights: [
        'Stories unite humanity',
        'Cognitive revolution changed everything',
      ],
      lastRead: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [constellations, setConstellations] = useState<Constellation[]>([
    {
      id: 'tech-constellation',
      name: 'Technology Nebula',
      genre: 'Technology',
      books: ['1', '2'],
      centerPosition: { x: 375, y: 175 },
      brightness: 0.9,
    },
    {
      id: 'growth-constellation',
      name: 'Personal Growth Galaxy',
      genre: 'Self-Development',
      books: ['3', '5'],
      centerPosition: { x: 175, y: 350 },
      brightness: 0.8,
    },
    {
      id: 'mind-constellation',
      name: 'Mind & Design Cluster',
      genre: 'Psychology',
      books: ['4', '6'],
      centerPosition: { x: 525, y: 350 },
      brightness: 0.7,
    },
  ]);

  const [universeState, setUniverseState] = useState<UniverseState>({
    zoomLevel: 1.0,
    centerPosition: { x: 400, y: 350 },
    selectedBook: null,
    hoveredBook: null,
    activeConstellation: null,
    viewMode: 'universe',
    animationSpeed: 1.0,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Animation and rendering logic
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw universe background
    drawUniverseBackground(ctx, canvas);

    // Draw constellations (connection lines)
    drawConstellations(ctx);

    // Draw books as stars
    drawBooks(ctx);

    // Draw UI overlays
    drawUIOverlays(ctx, canvas);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [books, constellations, universeState, mousePosition]);

  // Draw the deep space background with stars
  const drawUniverseBackground = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    // Deep space gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height),
    );
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, '#0f172a');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Background stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 1;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Draw constellation connection lines
  const drawConstellations = (ctx: CanvasRenderingContext2D) => {
    constellations.forEach((constellation) => {
      const constellationBooks = books.filter((book) =>
        constellation.books.includes(book.id),
      );

      // Draw connections between books in the constellation
      ctx.strokeStyle = `rgba(59, 130, 246, ${constellation.brightness * 0.3})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < constellationBooks.length - 1; i++) {
        for (let j = i + 1; j < constellationBooks.length; j++) {
          const book1 = constellationBooks[i];
          const book2 = constellationBooks[j];

          ctx.beginPath();
          ctx.moveTo(book1.position.x, book1.position.y);
          ctx.lineTo(book2.position.x, book2.position.y);
          ctx.stroke();
        }
      }

      // Draw constellation glow
      if (universeState.activeConstellation === constellation.id) {
        ctx.fillStyle = `rgba(59, 130, 246, 0.1)`;
        ctx.beginPath();
        ctx.arc(
          constellation.centerPosition.x,
          constellation.centerPosition.y,
          150,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    });

    // Draw individual book connections
    books.forEach((book) => {
      book.connections.forEach((connectionId) => {
        const connectedBook = books.find((b) => b.id === connectionId);
        if (connectedBook) {
          ctx.strokeStyle = `rgba(148, 163, 184, 0.2)`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(book.position.x, book.position.y);
          ctx.lineTo(connectedBook.position.x, connectedBook.position.y);
          ctx.stroke();
        }
      });
    });
  };

  // Draw books as interactive stars
  const drawBooks = (ctx: CanvasRenderingContext2D) => {
    books.forEach((book) => {
      const isHovered = universeState.hoveredBook === book.id;
      const isSelected = universeState.selectedBook === book.id;
      const progress = book.readPages / book.pages;

      // Star size based on pages and reading progress
      const baseSize = Math.max(8, Math.min(20, book.pages / 30));
      const size = baseSize + (isHovered ? 5 : 0) + (isSelected ? 8 : 0);

      // Draw book star
      ctx.fillStyle = book.color;
      ctx.shadowColor = book.color;
      ctx.shadowBlur = isHovered || isSelected ? 20 : 10;

      drawStar(ctx, book.position.x, book.position.y, size, 5);

      // Draw progress ring
      if (progress > 0) {
        ctx.strokeStyle = book.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(
          book.position.x,
          book.position.y,
          size + 8,
          -Math.PI / 2,
          -Math.PI / 2 + progress * Math.PI * 2,
        );
        ctx.stroke();
      }

      // Draw rating stars for completed books
      if (progress === 1 && book.rating) {
        drawRatingStars(
          ctx,
          book.position.x,
          book.position.y + size + 20,
          book.rating,
        );
      }

      // Draw book label on hover or selection
      if (isHovered || isSelected) {
        drawBookLabel(ctx, book, isSelected);
      }
    });
  };

  // Draw a star shape
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    points: number,
  ) => {
    const outerRadius = size;
    const innerRadius = size * 0.4;

    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const starX = x + Math.cos(angle) * radius;
      const starY = y + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(starX, starY);
      } else {
        ctx.lineTo(starX, starY);
      }
    }
    ctx.closePath();
    ctx.fill();
  };

  // Draw rating stars
  const drawRatingStars = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rating: number,
  ) => {
    const starSize = 3;
    const spacing = 8;
    const startX = x - ((rating - 1) * spacing) / 2;

    ctx.fillStyle = '#fbbf24';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#fbbf24';

    for (let i = 0; i < rating; i++) {
      drawStar(ctx, startX + i * spacing, y, starSize, 5);
    }
  };

  // Draw book information label
  const drawBookLabel = (
    ctx: CanvasRenderingContext2D,
    book: Book,
    isSelected: boolean,
  ) => {
    const padding = 12;
    const lineHeight = 16;
    const maxWidth = 200;

    // Calculate label content
    const progress = Math.round((book.readPages / book.pages) * 100);
    const lines = [
      book.title,
      `by ${book.author}`,
      `${progress}% complete`,
      `${book.genre} • ${book.pages} pages`,
    ];

    if (isSelected && book.insights.length > 0) {
      lines.push('', 'Latest Insight:');
      lines.push(`"${book.insights[book.insights.length - 1]}"`);
    }

    // Calculate label dimensions
    const labelHeight = lines.length * lineHeight + padding * 2;
    const labelWidth = maxWidth;

    // Position label to avoid canvas edges
    let labelX = book.position.x + 30;
    let labelY = book.position.y - labelHeight / 2;

    if (labelX + labelWidth > canvasRef.current!.width - 10) {
      labelX = book.position.x - labelWidth - 30;
    }
    if (labelY < 10) labelY = 10;
    if (labelY + labelHeight > canvasRef.current!.height - 10) {
      labelY = canvasRef.current!.height - labelHeight - 10;
    }

    // Draw label background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = book.color;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

    ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
    ctx.strokeRect(labelX, labelY, labelWidth, labelHeight);

    // Draw label text
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '12px Inter, sans-serif';
    ctx.shadowBlur = 0;

    lines.forEach((line, index) => {
      if (index === 0) {
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillStyle = book.color;
      } else if (index === 1) {
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
      } else if (line === 'Latest Insight:') {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = '#f59e0b';
      } else if (line.startsWith('"')) {
        ctx.font = 'italic 10px Inter, sans-serif';
        ctx.fillStyle = '#d1d5db';
      } else {
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = '#cbd5e1';
      }

      ctx.fillText(
        line,
        labelX + padding,
        labelY + padding + (index + 1) * lineHeight,
      );
    });
  };

  // Draw UI overlays and controls
  const drawUIOverlays = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    // Draw universe navigation info
    if (universeState.viewMode === 'universe') {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(10, 10, 250, 100);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 250, 100);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.fillText("📚 Reader's Constellation", 20, 30);

      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${books.length} books in your universe`, 20, 50);
      ctx.fillText(`${constellations.length} constellations formed`, 20, 65);

      const totalPages = books.reduce((sum, book) => sum + book.readPages, 0);
      ctx.fillText(`${totalPages} pages read`, 20, 80);

      ctx.fillStyle = '#3b82f6';
      ctx.fillText('Click any star to explore', 20, 95);
    }

    // Draw zoom level indicator
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(canvas.width - 120, 10, 110, 30);

    ctx.strokeStyle = '#3b82f6';
    ctx.strokeRect(canvas.width - 120, 10, 110, 30);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(
      `Zoom: ${(universeState.zoomLevel * 100).toFixed(0)}%`,
      canvas.width - 110,
      28,
    );
  };

  // Handle mouse interactions
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setMousePosition({ x, y });

    if (isDragging) {
      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;

      setUniverseState((prev) => ({
        ...prev,
        centerPosition: {
          x: prev.centerPosition.x - deltaX,
          y: prev.centerPosition.y - deltaY,
        },
      }));

      setDragStart({ x, y });
    } else {
      // Check for book hover
      const hoveredBook = books.find((book) => {
        const distance = Math.sqrt(
          (x - book.position.x) ** 2 + (y - book.position.y) ** 2,
        );
        return distance <= 25; // Hover radius
      });

      setUniverseState((prev) => ({
        ...prev,
        hoveredBook: hoveredBook?.id || null,
      }));
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check for book click
    const clickedBook = books.find((book) => {
      const distance = Math.sqrt(
        (x - book.position.x) ** 2 + (y - book.position.y) ** 2,
      );
      return distance <= 25;
    });

    if (clickedBook) {
      setUniverseState((prev) => ({
        ...prev,
        selectedBook:
          prev.selectedBook === clickedBook.id ? null : clickedBook.id,
      }));

      if (onBookSelect) {
        onBookSelect(clickedBook);
      }
    } else {
      // Start dragging
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;

    setUniverseState((prev) => ({
      ...prev,
      zoomLevel: Math.max(0.5, Math.min(3.0, prev.zoomLevel * zoomFactor)),
    }));
  };

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  // Handle book interactions
  const handleMarkProgress = (bookId: string, pages: number) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? {
              ...book,
              readPages: Math.min(book.pages, book.readPages + pages),
              lastRead: new Date(),
            }
          : book,
      ),
    );

    if (onReadingProgress) {
      onReadingProgress(bookId, pages);
    }
  };

  const handleAddInsight = (bookId: string, insight: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? { ...book, insights: [...book.insights, insight] }
          : book,
      ),
    );

    if (onInsightCapture) {
      onInsightCapture(bookId, insight);
    }
  };

  const selectedBook = books.find(
    (book) => book.id === universeState.selectedBook,
  );

  return (
    <div className="readers-constellation">
      <div className="universe-header">
        <h1>🌌 Reader's Constellation</h1>
        <p>Galaxy Engine Prototype - Where Reading Becomes Exploration</p>
        <div className="universe-stats">
          <span>📖 {books.length} Stars</span>
          <span>⭐ {constellations.length} Constellations</span>
          <span>
            🎯 {books.filter((b) => b.readPages === b.pages).length} Completed
          </span>
        </div>
      </div>

      <div className="universe-container">
        <canvas
          ref={canvasRef}
          className="universe-canvas"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />

        {selectedBook && (
          <div className="book-details-panel">
            <div className="book-details-header">
              <h3>{selectedBook.title}</h3>
              <button
                className="close-panel"
                onClick={() =>
                  setUniverseState((prev) => ({ ...prev, selectedBook: null }))
                }
              >
                ×
              </button>
            </div>

            <div className="book-details-content">
              <p className="book-author">by {selectedBook.author}</p>
              <div className="book-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(selectedBook.readPages / selectedBook.pages) * 100}%`,
                      backgroundColor: selectedBook.color,
                    }}
                  />
                </div>
                <span className="progress-text">
                  {selectedBook.readPages} / {selectedBook.pages} pages (
                  {Math.round(
                    (selectedBook.readPages / selectedBook.pages) * 100,
                  )}
                  %)
                </span>
              </div>

              <div className="book-actions">
                <button
                  className="action-btn"
                  onClick={() => handleMarkProgress(selectedBook.id, 10)}
                  disabled={selectedBook.readPages >= selectedBook.pages}
                >
                  +10 Pages
                </button>
                <button
                  className="action-btn"
                  onClick={() =>
                    handleAddInsight(
                      selectedBook.id,
                      'New insight captured from reading session',
                    )
                  }
                >
                  💡 Add Insight
                </button>
              </div>

              {selectedBook.insights.length > 0 && (
                <div className="book-insights">
                  <h4>💭 Captured Insights</h4>
                  {selectedBook.insights.map((insight, index) => (
                    <div key={index} className="insight-item">
                      "{insight}"
                    </div>
                  ))}
                </div>
              )}

              <div className="book-tags">
                {selectedBook.tags.map((tag, index) => (
                  <span key={index} className="book-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="universe-controls">
        <div className="control-group">
          <label>Animation Speed:</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={universeState.animationSpeed}
            onChange={(e) =>
              setUniverseState((prev) => ({
                ...prev,
                animationSpeed: parseFloat(e.target.value),
              }))
            }
          />
        </div>

        <div className="control-actions">
          <button
            className="control-btn"
            onClick={() => console.log('Add Book to Universe')}
          >
            📚 Add Book
          </button>
          <button
            className="control-btn"
            onClick={() => console.log('Create New Constellation')}
          >
            ⭐ New Constellation
          </button>
          <button
            className="control-btn"
            onClick={() => console.log('Export Reading Universe')}
          >
            🌌 Export Universe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadersConstellation;
