// Build API URLs with optional base override for Cloudflare Pages/static deployments
const rawBase = (import.meta.env.VITE_API_BASE_URL || '').trim()
const API_BASE = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase

/**
 * Prefix a relative API path with the configured base.
 * Falls back to relative calls when no base is provided.
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return API_BASE ? `${API_BASE}${normalized}` : normalized
}

// GitHub repo metadata, overridable via env
export const githubRepo = import.meta.env.VITE_GITHUB_REPO || 'keithhegit/apk_converter'
export const githubUrl = `https://github.com/${githubRepo}`

