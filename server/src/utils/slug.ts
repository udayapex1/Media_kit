export const SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{1,48}[a-z0-9]$/;

export const isValidSlug = (slug: string): boolean => {
  return SLUG_REGEX.test(slug);
};
