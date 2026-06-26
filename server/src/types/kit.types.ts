import { z } from 'zod';

export const MetricSchema = z.object({
  id: z.string().min(1),
  platform: z.enum(['youtube', 'instagram', 'tiktok', 'twitter', 'twitch', 'other']),
  handle: z.string().min(1),
  followers: z.number().nonnegative(),
  engagement: z.number().nonnegative()
});

export const RateCardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().nonnegative(),
  turnaround: z.string()
});

export const CreatorKitSchema = z.object({
  username: z.string().regex(
    /^[a-z0-9][a-z0-9_-]{1,48}[a-z0-9]$/,
    'Username must be lowercase alphanumeric, dashes or underscores, 3-50 chars'
  ),
  full_name: z.string().max(100).optional().default(''),
  bio: z.string().optional().default(''),
  profile_image_url: z.string().url().optional().or(z.literal('')),
  theme_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color').optional().default('#6366F1'),
  base_currency: z.string().length(3).optional().default('USD'),
  metrics: z.array(MetricSchema).optional().default([]),
  rate_cards: z.array(RateCardSchema).optional().default([])
});

export type CreatorKit = z.infer<typeof CreatorKitSchema>;
