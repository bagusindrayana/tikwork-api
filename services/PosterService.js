class PosterService {

  static THEMES = [
    {
      name: 'glassmorphism',
      badgeText: 'WE ARE HIRING',
      ctaLabel: 'Apply Now',
      font: "'Plus Jakarta Sans', sans-serif",
      palettes: [
        { bg1: '#7c3aed', bg2: '#2563eb', text: '#fff', textSub: 'rgba(255,255,255,0.8)', accent: '#a78bfa', ctaBg: '#a78bfa', ctaText: '#1e1b4b' },
        { bg1: '#ec4899', bg2: '#8b5cf6', text: '#fff', textSub: 'rgba(255,255,255,0.8)', accent: '#f9a8d4', ctaBg: '#f9a8d4', ctaText: '#831843' },
        { bg1: '#0891b2', bg2: '#1e3a8a', text: '#fff', textSub: 'rgba(255,255,255,0.8)', accent: '#22d3ee', ctaBg: '#22d3ee', ctaText: '#164e63' },
        { bg1: '#059669', bg2: '#065f46', text: '#fff', textSub: 'rgba(255,255,255,0.8)', accent: '#6ee7b7', ctaBg: '#6ee7b7', ctaText: '#064e3b' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: true, hashtags: true },
    },
    {
      name: 'neobrutalism',
      badgeText: 'NOW HIRING!',
      ctaLabel: 'APPLY NOW →',
      font: "'Inter', sans-serif",
      palettes: [
        { bg1: '#facc15', bg2: '#fbbf24', text: '#000', textSub: 'rgba(0,0,0,0.7)', accent: '#ef4444', ctaBg: '#ef4444', ctaText: '#fff' },
        { bg1: '#a3e635', bg2: '#84cc16', text: '#000', textSub: 'rgba(0,0,0,0.7)', accent: '#3b82f6', ctaBg: '#3b82f6', ctaText: '#fff' },
        { bg1: '#fb923c', bg2: '#f97316', text: '#000', textSub: 'rgba(0,0,0,0.7)', accent: '#7c3aed', ctaBg: '#7c3aed', ctaText: '#fff' },
        { bg1: '#f472b6', bg2: '#ec4899', text: '#000', textSub: 'rgba(0,0,0,0.7)', accent: '#000', ctaBg: '#000', ctaText: '#f472b6' },
      ],
      show: { badge: true, logo: false, companyName: true, location: true, salary: true, tags: true, hashtags: false },
    },
    {
      name: 'minimalist',
      badgeText: 'Open Position',
      ctaLabel: 'Learn More',
      font: "'Inter', sans-serif",
      palettes: [
        { bg1: '#fafaf9', bg2: '#f5f5f4', text: '#1c1917', textSub: 'rgba(28,25,23,0.5)', accent: '#d97706', ctaBg: '#1c1917', ctaText: '#fafaf9' },
        { bg1: '#faf5ff', bg2: '#f3e8ff', text: '#1e1b4b', textSub: 'rgba(30,27,75,0.5)', accent: '#7c3aed', ctaBg: '#1e1b4b', ctaText: '#faf5ff' },
        { bg1: '#f0fdf4', bg2: '#ecfdf5', text: '#14532d', textSub: 'rgba(20,83,45,0.5)', accent: '#16a34a', ctaBg: '#14532d', ctaText: '#f0fdf4' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: false, hashtags: false },
    },
    {
      name: 'retro',
      badgeText: '> HIRING_ACTIVE',
      ctaLabel: '> EXECUTE_APPLY <',
      font: "'Courier New', monospace",
      palettes: [
        { bg1: '#0a0a0a', bg2: '#0f0f0f', text: '#00ff41', textSub: 'rgba(0,255,65,0.55)', accent: '#00ff41', ctaBg: '#00ff41', ctaText: '#0a0a0a' },
        { bg1: '#0a0a0a', bg2: '#0f0f0f', text: '#ffb000', textSub: 'rgba(255,176,0,0.55)', accent: '#ffb000', ctaBg: '#ffb000', ctaText: '#0a0a0a' },
        { bg1: '#0a0a0a', bg2: '#0f0f0f', text: '#00d4ff', textSub: 'rgba(0,212,255,0.55)', accent: '#00d4ff', ctaBg: '#00d4ff', ctaText: '#0a0a0a' },
      ],
      show: { badge: true, logo: false, companyName: true, location: true, salary: true, tags: false, hashtags: false },
    },
    {
      name: 'pastel',
      badgeText: '✨ Hiring',
      ctaLabel: 'Apply Now ✦',
      font: "'Plus Jakarta Sans', sans-serif",
      palettes: [
        { bg1: '#fce7f3', bg2: '#ddd6fe', text: '#4c1d95', textSub: 'rgba(76,29,149,0.6)', accent: '#a78bfa', ctaBg: '#8b5cf6', ctaText: '#fff' },
        { bg1: '#cffafe', bg2: '#bfdbfe', text: '#1e3a5f', textSub: 'rgba(30,58,95,0.6)', accent: '#38bdf8', ctaBg: '#0284c7', ctaText: '#fff' },
        { bg1: '#d9f99d', bg2: '#bbf7d0', text: '#14532d', textSub: 'rgba(20,83,45,0.6)', accent: '#22c55e', ctaBg: '#16a34a', ctaText: '#fff' },
        { bg1: '#fef3c7', bg2: '#fde68a', text: '#78350f', textSub: 'rgba(120,53,15,0.6)', accent: '#f59e0b', ctaBg: '#d97706', ctaText: '#fff' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: true, hashtags: true },
    },
    {
      name: 'monochrome',
      badgeText: 'HIRING',
      ctaLabel: 'APPLY',
      font: "'Inter', sans-serif",
      palettes: [
        { bg1: '#000', bg2: '#0a0a0a', text: '#fff', textSub: 'rgba(255,255,255,0.55)', accent: '#fff', ctaBg: '#fff', ctaText: '#000' },
        { bg1: '#fff', bg2: '#fafafa', text: '#000', textSub: 'rgba(0,0,0,0.5)', accent: '#000', ctaBg: '#000', ctaText: '#fff' },
      ],
      show: { badge: true, logo: false, companyName: true, location: true, salary: false, tags: false, hashtags: false },
    },
    {
      name: 'compact',
      badgeText: 'JOB VACANCY',
      ctaLabel: 'Apply Now',
      font: "'Inter', sans-serif",
      palettes: [
        { bg1: '#1e293b', bg2: '#0f172a', text: '#e2e8f0', textSub: 'rgba(226,232,240,0.65)', accent: '#3b82f6', ctaBg: '#3b82f6', ctaText: '#fff' },
        { bg1: '#fafaf9', bg2: '#f5f5f4', text: '#292524', textSub: 'rgba(41,37,36,0.6)', accent: '#ef4444', ctaBg: '#ef4444', ctaText: '#fff' },
        { bg1: '#1a1a2e', bg2: '#16213e', text: '#e0e7ff', textSub: 'rgba(224,231,255,0.65)', accent: '#eab308', ctaBg: '#eab308', ctaText: '#1a1a2e' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: true, hashtags: false },
    },
    {
      name: 'bold-type',
      badgeText: 'WE ARE HIRING',
      ctaLabel: 'APPLY NOW',
      font: "'Inter', sans-serif",
      palettes: [
        { bg1: '#dc2626', bg2: '#991b1b', text: '#fff', textSub: 'rgba(255,255,255,0.8)', accent: '#fef2f2', ctaBg: '#fff', ctaText: '#dc2626' },
        { bg1: '#2563eb', bg2: '#1d4ed8', text: '#fff', textSub: 'rgba(255,255,255,0.8)', accent: '#dbeafe', ctaBg: '#fff', ctaText: '#2563eb' },
        { bg1: '#000', bg2: '#18181b', text: '#ccff00', textSub: 'rgba(204,255,0,0.65)', accent: '#ccff00', ctaBg: '#ccff00', ctaText: '#000' },
      ],
      show: { badge: true, logo: false, companyName: true, location: true, salary: false, tags: false, hashtags: false },
    },
    {
      name: 'corporate',
      badgeText: 'Career Opportunity',
      ctaLabel: 'Apply Now',
      font: "'Inter', sans-serif",
      palettes: [
        { bg1: '#0f172a', bg2: '#020617', text: '#e2e8f0', textSub: 'rgba(226,232,240,0.6)', accent: '#38bdf8', ctaBg: '#0ea5e9', ctaText: '#fff' },
        { bg1: '#1e3a5f', bg2: '#0c1929', text: '#f0f9ff', textSub: 'rgba(240,249,255,0.65)', accent: '#fbbf24', ctaBg: '#f59e0b', ctaText: '#1e3a5f' },
        { bg1: '#312e81', bg2: '#1e1b4b', text: '#e0e7ff', textSub: 'rgba(224,231,255,0.65)', accent: '#818cf8', ctaBg: '#6366f1', ctaText: '#fff' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: true, hashtags: false },
    },
    {
      name: 'magazine',
      badgeText: 'NOW HIRING',
      ctaLabel: 'Read More →',
      font: "'Georgia', serif",
      palettes: [
        { bg1: '#fefce8', bg2: '#fef9c3', text: '#1c1917', textSub: 'rgba(28,25,23,0.55)', accent: '#dc2626', ctaBg: '#dc2626', ctaText: '#fff' },
        { bg1: '#fff1f2', bg2: '#ffe4e6', text: '#1c1917', textSub: 'rgba(28,25,23,0.55)', accent: '#be123c', ctaBg: '#be123c', ctaText: '#fff' },
        { bg1: '#eff6ff', bg2: '#dbeafe', text: '#1e3a5f', textSub: 'rgba(30,58,95,0.55)', accent: '#2563eb', ctaBg: '#2563eb', ctaText: '#fff' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: false, hashtags: false },
    },
    {
      name: 'sci-fi',
      badgeText: '◆ RECRUITING',
      ctaLabel: '[ INITIATE ]',
      font: "'Courier New', monospace",
      palettes: [
        { bg1: '#030712', bg2: '#0f172a', text: '#00f2ea', textSub: 'rgba(0,242,234,0.55)', accent: '#00f2ea', ctaBg: 'transparent', ctaText: '#00f2ea' },
        { bg1: '#030712', bg2: '#0f172a', text: '#e879f9', textSub: 'rgba(232,121,249,0.55)', accent: '#e879f9', ctaBg: 'transparent', ctaText: '#e879f9' },
        { bg1: '#030712', bg2: '#0f172a', text: '#fb923c', textSub: 'rgba(251,146,60,0.55)', accent: '#fb923c', ctaBg: 'transparent', ctaText: '#fb923c' },
      ],
      show: { badge: true, logo: false, companyName: true, location: true, salary: true, tags: true, hashtags: false },
    },
    {
      name: 'social',
      badgeText: '#hiring • TIKWORK',
      ctaLabel: 'Apply di TikWork',
      font: "'Plus Jakarta Sans', sans-serif",
      palettes: [
        { bg1: '#0f172a', bg2: '#1e293b', text: '#f8fafc', textSub: 'rgba(248,250,252,0.65)', accent: '#fe2c55', ctaBg: '#fe2c55', ctaText: '#fff' },
        { bg1: '#000', bg2: '#18181b', text: '#fff', textSub: 'rgba(255,255,255,0.65)', accent: '#00f2ea', ctaBg: '#00f2ea', ctaText: '#000' },
      ],
      show: { badge: true, logo: true, companyName: true, location: true, salary: true, tags: true, hashtags: true },
    },
  ];

  /**
   * Generate poster configuration
   */
  static generateConfig(job, options = {}) {
    const seed = this.getSeededRandom(job.job_id || job.id || 'default');

    // Select theme (overridable via query param)
    let theme;
    if (options.theme) {
      theme = this.THEMES.find(t => t.name === options.theme);
    }
    if (!theme) {
      theme = this.THEMES[seed % this.THEMES.length];
    }

    // Select palette within theme
    const palette = this.pickFromArray(theme.palettes, seed, 3);

    // Title length calculation
    const titleLen = job.job_title ? job.job_title.length : 0;
    let titleLength = 'medium';
    if (titleLen < 15) titleLength = 'short';
    else if (titleLen > 40) titleLength = 'super-long';
    else if (titleLen > 25) titleLength = 'long';

    return {
      theme: theme.name,
      palette,
      font: theme.font,
      show: theme.show,
      badgeText: theme.badgeText,
      ctaLabel: theme.ctaLabel,
      layout: options.layout || ['default', 'centered', 'spotlight', 'modern'][seed % 4],
      titleLength,
      seed,
    };
  }

  static pickFromArray(array, seed, offset = 0) {
    return array[(seed + offset) % array.length];
  }

  static getSeededRandom(seedStr) {
    let hash = 0;
    if (!seedStr) return 0;
    const str = String(seedStr);
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  static setSeed(seed) {
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
      try { return JSON.parse(value); } catch { return fallback; }
    };

    const safeArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      const parsed = safeParseJson(value, []);
      return Array.isArray(parsed) ? parsed : [];
    };

    const categories = safeArray(job.job_category).filter(Boolean).map(String);
    const companyHandle = '@' + String(job.job_company_name || 'tikwork')
      .toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 22);

    let companyLogo = job.job_company_logo;
    if (!companyLogo || companyLogo.includes('N/A')) {
      companyLogo = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.job_company_name || 'TikWork') + '&background=6366f1&color=fff&bold=true';
    }

    let companyName = job.job_company_name;
    if (companyName && companyName.includes('https')) {
      companyName = '-';
    }

    return {
      categories: categories.slice(0, 4),
      companyHandle,
      companyLogo,
      companyName,
    };
  }
}

module.exports = PosterService;