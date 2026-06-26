import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

const ConversionQuerySchema = z.object({
  amount: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val > 0, {
    message: "Amount must be a positive number",
  }),
  from: z.string().length(3).transform(v => v.toUpperCase()),
  to: z.string().length(3).transform(v => v.toUpperCase()),
});

interface CacheEntry {
  rate: number;
  expiresAt: number;
}
const rateCache: Record<string, CacheEntry> = {};
const TTL_MS = 60 * 60 * 1000;

router.get('/convert', asyncHandler(async (req: Request, res: Response) => {
  const { amount, from, to } = ConversionQuerySchema.parse(req.query);

  const cacheKey = `${from}_${to}`;
  let rate = 1;

  if (from !== to) {
    const now = Date.now();
    const cached = rateCache[cacheKey];

    if (cached && cached.expiresAt > now) {
      console.log(`Cache hit for ${cacheKey}`);
      rate = cached.rate;
    } else {
      console.log(`Cache miss for ${cacheKey}, fetching from upstream`);
      
      const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      if (data.result === 'success' && data.rates[to]) {
        rate = data.rates[to];
        rateCache[cacheKey] = {
          rate,
          expiresAt: now + TTL_MS
        };
      } else {
        return res.status(400).json({ error: 'Unsupported currency code' });
      }
    }
  }

  const converted = Number((amount * rate).toFixed(2));

  return res.status(200).json({
    amount,
    from,
    to,
    rate,
    converted
  });
}));

export default router;
