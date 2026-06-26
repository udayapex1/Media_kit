import { Router, Request, Response, NextFunction } from 'express';
import pool from '../db/pool';
import { CreatorKitSchema } from '../types/kit.types';

const router = Router();

router.post('/save', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = CreatorKitSchema.parse(req.body);

    const query = `
      INSERT INTO creator_kits (
        username, full_name, bio, profile_image_url, theme_color, base_currency, metrics, rate_cards
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (username) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        bio = EXCLUDED.bio,
        profile_image_url = EXCLUDED.profile_image_url,
        theme_color = EXCLUDED.theme_color,
        base_currency = EXCLUDED.base_currency,
        metrics = EXCLUDED.metrics,
        rate_cards = EXCLUDED.rate_cards
      RETURNING *;
    `;

    const values = [
      data.username,
      data.full_name,
      data.bio,
      data.profile_image_url || null,
      data.theme_color,
      data.base_currency,
      JSON.stringify(data.metrics),
      JSON.stringify(data.rate_cards)
    ];

    const result = await pool.query(query, values);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    
    const result = await pool.query('SELECT * FROM creator_kits WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Kit not found', username });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
