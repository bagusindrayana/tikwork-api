class PosterService {
  /**
   * Generate poster configuration using seeded randomness
   * @param {Object} job - Job vacancy data
   * @param {Object} options - Customization options
   * @returns {Object} Configuration object
   */
  static generateConfig(job, options = {}) {
    // Use job ID or unique string to seed the random generator for consistency
    const seed = this.getSeededRandom(job.job_id || job.id || 'default');
    
    // Set seed for consistent random generation
    this.setSeed(seed);

    // 1. Color Palettes (Backgrounds & Text) - Tailwind classes
    const palettes = [
      { 
        bg: 'bg-gradient-to-br from-purple-600 to-blue-600', 
        text: 'text-white', 
        accent: 'bg-white/20',
        name: 'purple-blue'
      },
      { 
        bg: 'bg-gradient-to-tr from-emerald-500 to-teal-900', 
        text: 'text-white', 
        accent: 'bg-emerald-800/30',
        name: 'emerald-teal'
      },
      { 
        bg: 'bg-gradient-to-bl from-rose-500 to-orange-400', 
        text: 'text-white', 
        accent: 'bg-white/20',
        name: 'rose-orange'
      },
      { 
        bg: 'bg-gray-900', 
        text: 'text-white', 
        accent: 'bg-gray-800',
        name: 'dark'
      },
      { 
        bg: 'bg-blue-900', 
        text: 'text-blue-50', 
        accent: 'bg-blue-800',
        name: 'navy'
      },
      { 
        bg: 'bg-[#F4D03F]', 
        text: 'text-black', 
        accent: 'bg-black/10',
        name: 'yellow'
      },
      { 
        bg: 'bg-[#E74C3C]', 
        text: 'text-white', 
        accent: 'bg-white/20',
        name: 'red'
      },
      { 
        bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900', 
        text: 'text-gray-100', 
        accent: 'bg-purple-500/20',
        name: 'tiktok-dark'
      },
      { 
        bg: 'bg-gradient-to-b from-teal-900 via-gray-900 to-rose-900', 
        text: 'text-white', 
        accent: 'bg-gray-800',
        name: 'teal-rose'
      },
      { 
        bg: 'bg-[#FFDEE9] bg-gradient-to-b from-[#FFDEE9] to-[#B5FFFC]', 
        text: 'text-slate-800', 
        accent: 'bg-white/50',
        name: 'pink-blue-pastel'
      },
      { 
        bg: 'bg-[#D9AFD9] bg-gradient-to-tr from-[#D9AFD9] to-[#97D9E1]', 
        text: 'text-slate-900', 
        accent: 'bg-white/40',
        name: 'purple-blue-pastel'
      },
      { 
        bg: 'bg-[#FDFBF7]', 
        text: 'text-stone-800', 
        accent: 'bg-stone-200',
        name: 'minimalist-cream'
      },
      { 
        bg: 'bg-black', 
        text: 'text-[#CCFF00]', 
        accent: 'bg-[#CCFF00]/20',
        name: 'cyber-acid'
      },
      { 
        bg: 'bg-[#FF0050]', 
        text: 'text-white', 
        accent: 'bg-black/20',
        name: 'tiktok-red'
      },
      { 
        bg: 'bg-[#0000FF]', 
        text: 'text-white', 
        accent: 'bg-white/20',
        name: 'pure-blue'
      },
      { 
        bg: 'bg-orange-500', 
        text: 'text-black', 
        accent: 'bg-black/10',
        name: 'orange'
      }
    ];

    const palette = this.pickFromArray(palettes, seed, 0);

    // 2. Patterns (Overlay styles)
    const patterns = [
      'none',
      'radial-dots',     // radial-gradient
      'grid-lines',      // repeating-linear-gradient
      'noise',           // noisy texture
      'circles',         // large circles
      'diagonal-stripes',
      'zigzag',
      'polka-pop',
      'waves',
      'isometric',
      'checkerboard'
    ];
    
    const pattern = this.pickFromArray(patterns, seed, 1);

    // 3. Fonts
    const fonts = [
      'font-sans',           // Inter (Default)
      'font-serif',          // Playfair Display
      'font-mono',           // Space Mono
      'font-oswald',         // Oswald
      'font-comic',          // Comic Sans (Meme)
      'font-retro',          // Retro/Pixel
      'font-display-heavy'   // Impact-like
    ];
    
    const font = this.pickFromArray(fonts, seed, 2);

    // 4. Layouts
    const layouts = [
      'centered',        // Everything center aligned nicely
      'left-aligned',    // Classic left align
      'card-center',     // Floating card in center
      'split-vertical',  // Logo top, content bottom massive
      'minimalist',      // Very small text, lots of whitespace
      'tiktok-modern',   // New Glitch/Neon layout
      'modern-split',    // High contrast split screen
      'cyber-grid',      // Terminal aesthetic
      'bold-typography', // Massive text focus
      'neobrutalism',    // Brutalist borders, high contrast
      'glass-modern',    // Glassmorphism
      'meme-design'      // Chaotic "Design is my passion"
    ];
    
    const layout = this.pickFromArray(layouts, seed, 3);

    // 5. Button Styles
    const buttonStyles = [
      'solid-pill',      // Classic rounded full color
      'outline-neon',    // Transparent with glowing border
      'glass',           // Backdrop blur white/glass
      'brutalist',       // Sharp corners, heavy shadow
      'gradient-shine',  // Gradient background
      'retro-windows',   // Windows 95 style
      'pixel-art'        // Pixelated borders
    ];
    
    const buttonStyle = this.pickFromArray(buttonStyles, seed, 4);

    // 6. Decorative Elements
    const decorations = [
      'none',
      'watermark-logo',  // Huge logo in background
      'shapes-corner',   // Abstract blobs
      'line-separator',  // Lines between elements
      'border-frame'     // Border around content
    ];
    
    const decoration = this.pickFromArray(decorations, seed, 5);

    // Title Length Calculation
    let titleLength = 'medium';
    const titleLen = job.job_title ? job.job_title.length : 0;
    if (titleLen < 15) titleLength = 'short';
    else if (titleLen > 40) titleLength = 'super-long';
    else if (titleLen > 25) titleLength = 'long';
    else titleLength = 'medium';

    // Component ordering using seed
    const components = this.shuffleComponents(seed);

    return {
      palette,
      pattern,
      font,
      layout,
      decoration,
      buttonStyle,
      titleLength,
      components,
      seed
    };
  }

  /**
   * Helper to pick array item based on seed
   */
  static pickFromArray(array, seed, offset = 0) {
    return array[(seed + offset) % array.length];
  }

  /**
   * Shuffle components order based on seed
   */
  static shuffleComponents(seed) {
    const order = [1, 2, 3, 4];
    // Fisher-Yates shuffle with seeded random
    for (let i = order.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1);
      [order[i], order[j]] = [order[j], order[i]];
    }
    return {
      badge: order[0],
      title: order[1],
      info: order[2],
      cta: order[3]
    };
  }

  /**
   * Get seeded random number
   */
  static getSeededRandom(seedStr) {
    let hash = 0;
    if (!seedStr) return 0;
    const str = String(seedStr);
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Set seed for Math.random (simplified implementation)
   */
  static setSeed(seed) {
    // In a real implementation, you'd use a seeded random number generator
    // For now, we'll use the seed directly in our pickFromArray method
    return seed;
  }

  /**
   * Prepare job data for poster rendering
   */
  static prepareJobData(job) {
    const safeParseJson = (value, fallback) => {
      if (value == null) return fallback;
      if (typeof value === 'object') return value;
      if (typeof value !== 'string') return fallback;
      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    };

    const safeArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      const parsed = safeParseJson(value, []);
      return Array.isArray(parsed) ? parsed : [];
    };

    const categories = safeArray(job.job_category).filter(Boolean).map(String);
    const companyHandle = '@' + String(job.job_company_name || 'tikwork')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 22);

    // Handle company logo
    let companyLogo = job.job_company_logo;
    if (!companyLogo || companyLogo.includes('N/A')) {
      companyLogo = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.job_company_name || 'TikWork');
    }

    // Handle company name with URLs
    let companyName = job.job_company_name;
    if (companyName && companyName.includes('https')) {
      companyName = "-";
    }

    return {
      categories: categories.slice(0, 4),
      companyHandle,
      companyLogo,
      companyName
    };
  }
}

module.exports = PosterService;