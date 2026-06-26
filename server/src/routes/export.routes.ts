import { Router, Request, Response, NextFunction } from 'express';
import pool from '../db/pool';
import PDFDocument from 'pdfkit';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/:username/export-pdf', asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;

  const result = await pool.query('SELECT * FROM creator_kits WHERE username = $1', [username]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Kit not found', username });
  }

  const kit = result.rows[0];

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${username}-media-kit.pdf"`);
  
  doc.pipe(res);

  doc.fontSize(24).text(kit.full_name || username, { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('gray').text(`@${username}`, { align: 'center' });
  
  if (kit.bio) {
    doc.moveDown(2);
    doc.fontSize(14).fillColor('black').text('Bio', { underline: true });
    doc.fontSize(12).text(kit.bio);
  }

  if (kit.metrics && kit.metrics.length > 0) {
    doc.moveDown(2);
    doc.fontSize(14).text('Metrics', { underline: true });
    doc.moveDown(0.5);

    const startY = doc.y;
    kit.metrics.forEach((m: any, index: number) => {
      const isRightColumn = index % 2 !== 0;
      const xPos = isRightColumn ? 300 : 50;
      const yPos = startY + Math.floor(index / 2) * 60;
      
      doc.fontSize(12).text(`${m.platform.toUpperCase()} - @${m.handle}`, xPos, yPos);
      doc.fontSize(10).fillColor('gray').text(`Followers: ${m.followers.toLocaleString()}`, xPos, yPos + 15);
      doc.text(`Engagement: ${m.engagement}%`, xPos, yPos + 30);
      doc.fillColor('black');
    });
    doc.y = startY + Math.ceil(kit.metrics.length / 2) * 60 + 20;
  }

  if (kit.rate_cards && kit.rate_cards.length > 0) {
    doc.moveDown(2);
    doc.fontSize(14).text('Rate Matrix', { underline: true });
    doc.moveDown(0.5);

    kit.rate_cards.forEach((rc: any) => {
      doc.fontSize(12).text(`${rc.name} - ${kit.base_currency} ${rc.price}`);
      doc.fontSize(10).fillColor('gray').text(rc.description);
      doc.text(`Turnaround: ${rc.turnaround}`);
      doc.fillColor('black');
      doc.moveDown(1);
    });
  }

  doc.end();
}));

export default router;
