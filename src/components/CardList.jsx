// src/components/CardList.jsx
import React from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

export default function CardList({ data = [], pageSize = 12 }) {
  const [filtered, setFiltered] = React.useState(data);
  const [products, setProducts] = React.useState([]);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    setFiltered(data);
    setOffset(0);
  }, [data]);

  React.useEffect(() => {
    setProducts(filtered.slice(offset, offset + pageSize));
  }, [filtered, offset, pageSize]);

  // Normalize a single tag entry (string | number | object)
  const normalizeTag = (t) => {
    if (t == null) return null;
    if (typeof t === 'string' || typeof t === 'number') return String(t);
    if (typeof t === 'object') {
      const cand =
        t.name ?? t.title ?? t.label ?? t.tag ?? t.value ?? t.text ?? null;
      return cand != null ? String(cand) : null;
    }
    return null;
  };

  // Read tags regardless of field naming/shape
  const getTags = (p) => {
    const arr =
      (Array.isArray(p.tags) && p.tags) ||
      (Array.isArray(p.tag_list) && p.tag_list) ||
      (Array.isArray(p.categories) && p.categories) ||
      (Array.isArray(p.keywords) && p.keywords) ||
      [];
    return arr
      .map(normalizeTag)
      .filter(Boolean)
      .map((t) => t.toLowerCase());
  };

  // DEV AID: expose data & tags so you can see what to type (remove later)
  React.useEffect(() => {
    window._data = data;
    const s = new Set();
    data.forEach((p) => getTags(p).forEach((t) => s.add(t)));
    window._tags = [...s].sort();
    console.log('Attached window._data (length):', data.length);
    console.log('Available tags (window._tags):', window._tags);
  }, [data]); // <-- remove this block when done testing

  // Filter by tags; reset to first page
  const filterTags = (rawTerm) => {
    const term = (rawTerm || '').trim().toLowerCase();
    if (!term) {
      setFiltered(data);
      setOffset(0);
      return;
    }
    const next = data.filter((p) => getTags(p).some((t) => t.includes(term)));
    setFiltered(next);
    setOffset(0);
  };

  // Unified pagination handler
  const paginate = (direction) => {
    setOffset((prev) => {
      const delta = direction === 'next' ? pageSize : -pageSize;
      const maxStart = Math.max(0, filtered.length - pageSize);
      return Math.max(0, Math.min(prev + delta, maxStart));
    });
  };

  const atStart = offset === 0;
  const atEnd = offset + pageSize >= filtered.length;

  return (
    <section className="pa3 pa4-ns">
      <Search handleSearch={filterTags} />

      <div className="cf">
        {products.map((p, idx) => (
          <div key={p.id ?? p.slug ?? idx} className="fl w-100 w-50-m w-25-l pa2">
            <Card {...p} />
          </div>
        ))}

        {products.length === 0 && (
          <div className="tc gray pv4">No products found for this tag.</div>
        )}
      </div>

      <div className="mt3 flex items-center justify-between">
        <Button text="Previous" handleClick={() => paginate('prev')} disabled={atStart} />
        <span className="gray f6">
          {filtered.length === 0
            ? '0–0 of 0'
            : `${offset + 1}–${Math.min(offset + pageSize, filtered.length)} of ${filtered.length}`}
        </span>
        <Button text="Next" handleClick={() => paginate('next')} disabled={atEnd} />
      </div>
    </section>
  );
}
