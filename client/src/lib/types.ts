export type MetricPlatform = "youtube" | "instagram" | "tiktok" | "twitter" | "twitch" | "other";

export interface Metric {
  id: string;
  platform: MetricPlatform;
  handle: string;
  followers: number;
  engagement: number;
}

export interface RateCard {
  id: string;
  name: string;
  description: string;
  price: number;
  turnaround: string;
}

export interface CreatorKit {
  username: string;
  full_name?: string;
  bio?: string;
  profile_image_url?: string;
  theme_color?: string;
  base_currency?: string;
  metrics?: Metric[];
  rate_cards?: RateCard[];
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export const SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{1,48}[a-z0-9]$/;

export const isValidSlug = (slug: string): boolean => {
  return SLUG_REGEX.test(slug);
};
