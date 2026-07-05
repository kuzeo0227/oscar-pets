// .docx export for scripts.
// Saved to exports/scripts/YYYY-MM-DD_topic-slug.docx and returned as a buffer
// so the route can also stream it to the browser in the same request.

const fsp = require('fs/promises');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
} = require('docx');

const EXPORT_DIR = path.join(__dirname, '..', 'exports', 'scripts');

function slugify(text) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'script'
  );
}

function notesFor(script, listKey, section) {
  return (script[listKey] || []).filter((n) => n.section === section);
}

function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts.run })],
    spacing: { after: opts.after ?? 120 },
    ...opts.para,
  });
}

function buildDoc(script) {
  const children = [
    new Paragraph({
      text: script.topic || 'Untitled script',
      heading: HeadingLevel.TITLE,
      spacing: { after: 240 },
    }),
  ];

  const sections = [
    ['Hook', 'hook'],
    ['Insight', 'insight'],
    ['CTA', 'cta'],
  ];

  for (const [label, key] of sections) {
    children.push(new Paragraph({ text: label, heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 } }));
    children.push(para(script[key] || ''));

    const filming = notesFor(script, 'filmingNotes', key);
    if (filming.length) {
      children.push(para('Filming notes', { run: { bold: true }, after: 60 }));
      filming.forEach((n) => children.push(para(n.note, { para: { bullet: { level: 0 } }, after: 60 })));
    }
    const editing = notesFor(script, 'editingNotes', key);
    if (editing.length) {
      children.push(para('Editing notes', { run: { bold: true }, after: 60 }));
      editing.forEach((n) => children.push(para(n.note, { para: { bullet: { level: 0 } }, after: 60 })));
    }
  }

  children.push(new Paragraph({ text: 'Caption', heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 } }));
  children.push(para(script.caption || ''));

  children.push(new Paragraph({ text: 'Hashtags', heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 } }));
  children.push(para((script.hashtags || []).join(' ')));

  return new Document({ sections: [{ children }] });
}

// Returns { filename, filePath, buffer }.
async function exportScript(script) {
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${date}_${slugify(script.topic)}.docx`;
  const filePath = path.join(EXPORT_DIR, filename);

  const buffer = await Packer.toBuffer(buildDoc(script));
  await fsp.mkdir(EXPORT_DIR, { recursive: true });
  await fsp.writeFile(filePath, buffer);

  return { filename, filePath, buffer };
}

module.exports = { exportScript, slugify };
