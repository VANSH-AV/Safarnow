import { useLayoutEffect, useRef, useState } from 'react';

function useWidth(max = 800) {
  const ref = useRef(null);
  const [width, setWidth] = useState(600);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setWidth(Math.min(el.clientWidth || 600, max));
    measure();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [max]);
  return [ref, width];
}

function niceCeil(v) {
  if (!v) return 10;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (v <= m * mag) return m * mag;
  }
  return 10 * mag;
}

function fmtNumber(v) {
  return Number.isFinite(Number(v)) ? Number(v).toLocaleString('en-IN') : String(v);
}

const AXIS = { y: '#64748B', x: '#94A3B8', grid: '#EEF2F6' };
const PAD = { top: 18, right: 12, bottom: 34, left: 46 };

function ChartTooltip({ items, x, y, w }) {
  const toolW = Math.min(170, Math.max(110, w));
  const toolH = 16 + items.length * 20;
  const tx = Math.min(Math.max(x - toolW / 2, 2), w - toolW - 2);
  const ty = Math.max(y - toolH - 8, 2);
  return (
    <g pointerEvents="none">
      <rect x={tx} y={ty} width={toolW} height={toolH} rx={10} fill="#fff" stroke="#E2E8F0" />
      {items.map((it, i) => (
        <g key={i}>
          <circle cx={tx + 12} cy={ty + 16 + i * 20} r={3.5} fill={it.color} />
          <text x={tx + 22} y={ty + 20 + i * 20} fontSize={11.5} fill="#334155">
            {it.label}
          </text>
          <text x={tx + toolW - 12} y={ty + 20 + i * 20} fontSize={11.5} fontWeight={600} fill="#0F172A" textAnchor="end">
            {it.value}
          </text>
        </g>
      ))}
    </g>
  );
}

export function BarGroupChart({
  data = [],
  xKey = 'name',
  series = [],
  height = 280,
  getBarColor,
  tooltipFormatter = (v, name) => `${name}: ${v}`,
}) {
  const [ref, w] = useWidth();
  const [hover, setHover] = useState(null);

  const flat = series.length ? series : [{ key: 'value', name: 'Value', color: '#1688D4' }];
  const maxVal = niceCeil(Math.max(1, ...data.flatMap((d) => flat.map((s) => Number(d[s.key]) || 0))));
  const innerW = w - PAD.left - PAD.right;
  const innerH = height - PAD.top - PAD.bottom;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => maxVal * f);
  const slotW = innerW / Math.max(1, data.length);
  const groupW = slotW * 0.7;
  const barW = Math.max(2, (groupW * 0.8) / flat.length);

  return (
    <div ref={ref} style={{ width: '100%', height }}>
      <svg width={w} height={height} role="img">
        {ticks.map((t, i) => {
          const y = PAD.top + innerH - (t / maxVal) * innerH;
          return (
            <g key={i}>
              <line x1={PAD.left} y1={y} x2={w - PAD.right} y2={y} stroke={AXIS.grid} strokeDasharray={i === 0 ? '0' : '3 3'} />
              <text x={PAD.left - 8} y={y + 4} fontSize={11} fill={AXIS.y} textAnchor="end">
                {t >= 1000 ? `${Math.round(t / 1000)}k` : fmtNumber(t)}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const cx = PAD.left + slotW * i + slotW / 2;
          const slotY = PAD.top + innerH;
          return (
            <g key={i}>
              <text x={cx} y={slotY + 20} fontSize={11} fill={AXIS.x} textAnchor="middle">
                {String(d[xKey] ?? '')}
              </text>
              {flat.map((s, j) => {
                const v = Number(d[s.key]) || 0;
                const bh = (v / maxVal) * innerH;
                const bx = cx - groupW / 2 + j * (barW + 2) + (flat.length === 1 ? (groupW - barW) / 2 : 0);
                const by = slotY - bh;
                const color = flat.length === 1 && getBarColor ? getBarColor(d, s) : s.color;
                return (
                  <rect
                    key={j}
                    x={bx}
                    y={by}
                    width={barW}
                    height={Math.max(bh, 1)}
                    rx={3}
                    fill={color}
                    opacity={hover && hover.i === i ? 1 : 0.92}
                    onMouseEnter={() => setHover({ i })}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </g>
          );
        })}

        {hover && (
          <ChartTooltip
            w={w}
            x={PAD.left + slotW * hover.i + slotW / 2}
            y={PAD.top + 4}
            items={flat.map((s) => ({
              color: s.color,
              label: s.name,
              value: typeof tooltipFormatter === 'function' ? tooltipFormatter(data[hover.i][s.key], s.name) : String(data[hover.i][s.key]),
            }))}
          />
        )}
      </svg>
    </div>
  );
}

function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const cp2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${cp1.x.toFixed(2)} ${cp1.y.toFixed(2)} ${cp2.x.toFixed(2)} ${cp2.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export function LineChartView({
  data = [],
  xKey = 'label',
  series = [],
  height = 220,
  area = false,
  tooltipFormatter = (v, name) => `${name}: ${v}`,
}) {
  const [ref, w] = useWidth();
  const [hover, setHover] = useState(null);

  const flat = series.length ? series : [{ key: 'value', name: 'Value', color: '#1688D4' }];
  const maxVal = niceCeil(Math.max(1, ...data.flatMap((d) => flat.map((s) => Number(d[s.key]) || 0))));
  const innerW = w - PAD.left - PAD.right;
  const innerH = height - PAD.top - PAD.bottom;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => maxVal * f);
  const baseline = PAD.top + innerH;

  const pos = (i, v) => ({
    x: PAD.left + (data.length <= 1 ? innerW / 2 : (innerW * i) / (data.length - 1)),
    y: baseline - (v / maxVal) * innerH,
  });

  const paths = flat.map((s) => ({
    s,
    pts: data.map((d, i) => pos(i, Number(d[s.key]) || 0)),
    path: smoothPath(data.map((d, i) => pos(i, Number(d[s.key]) || 0))),
  }));

  const gradId = 'linefill-grad';

  return (
    <div ref={ref} style={{ width: '100%', height }}>
      <svg width={w} height={height} role="img">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={(flat[0] || {}).color || '#1688D4'} stopOpacity={0.28} />
            <stop offset="95%" stopColor={(flat[0] || {}).color || '#1688D4'} stopOpacity={0} />
          </linearGradient>
        </defs>

        {ticks.map((t, i) => {
          const y = baseline - (t / maxVal) * innerH;
          return (
            <g key={i}>
              <line x1={PAD.left} y1={y} x2={w - PAD.right} y2={y} stroke={AXIS.grid} strokeDasharray={i === 0 ? '0' : '3 3'} />
              <text x={PAD.left - 8} y={y + 4} fontSize={11} fill={AXIS.y} textAnchor="end">
                {t >= 1000 ? `${Math.round(t / 1000)}k` : fmtNumber(t)}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => (
          <text key={i} x={PAD.left + (data.length <= 1 ? innerW / 2 : (innerW * i) / (data.length - 1))} y={baseline + 20} fontSize={11} fill={AXIS.x} textAnchor="middle">
            {String(d[xKey] ?? '')}
          </text>
        ))}

        {area && paths[0] && (
          <path d={`${paths[0].path} L ${paths[0].pts[paths[0].pts.length - 1].x} ${baseline} L ${paths[0].pts[0].x} ${baseline} Z`} fill={`url(#${gradId})`} />
        )}

        {paths.map(({ s, path, pts }) => (
          <g key={s.key}>
            <path d={path} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={hover && hover.i === i ? 4.5 : 3.5} fill="#fff" stroke={s.color} strokeWidth={2} />
            ))}
          </g>
        ))}

        {data.map((d, i) => {
          const hx = PAD.left + (data.length <= 1 ? innerW / 2 : (innerW * i) / (data.length - 1));
          return (
            <rect
              key={i}
              x={hx - slotHalf(data, innerW) / 2}
              y={PAD.top}
              width={slotHalf(data, innerW)}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover({ i })}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}

        {hover && (
          <ChartTooltip
            w={w}
            x={PAD.left + (data.length <= 1 ? innerW / 2 : (innerW * hover.i) / (data.length - 1))}
            y={PAD.top + 4}
            items={flat.map((s) => ({
              color: s.color,
              label: s.name,
              value: typeof tooltipFormatter === 'function' ? tooltipFormatter(data[hover.i][s.key], s.name) : String(data[hover.i][s.key]),
            }))}
          />
        )}
      </svg>
    </div>
  );
}

function slotHalf(data, innerW) {
  return innerW / (data.length || 1);
}

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  if (endAngle - startAngle >= 359.9) {
    return `M ${polar(cx, cy, r, startAngle).x} ${polar(cx, cy, r, startAngle).y} A ${r} ${r} 0 1 1 ${polar(cx, cy, r, startAngle - 0.01).x} ${polar(cx, cy, r, startAngle - 0.01).y}`;
  }
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const large = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function DonutChart({ data = [], size = 220, strokeWidth = 26, padAngle = 4, centerLabel, centerValue }) {
  const [hover, setHover] = useState(null);
  const total = data.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
  const r = size / 2 - strokeWidth / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;

  const segments = data.reduce((arr, d, i) => {
    const prev = arr[i - 1] ? arr[i - 1].endA : 0;
    const frac = total ? (Number(d.value) || 0) / total : 0;
    const endA = prev + frac * 360;
    const pad = i === data.length - 1 ? 0 : Math.min(padAngle, (frac * 360) / 2);
    arr.push({ ...d, startA: prev + pad, endA: endA - pad, frac });
    return arr;
  }, []);

  return (
    <svg width={size} height={size} role="img" style={{ display: 'block' }}>
      {segments.map((d, i) => {
        const path = arcPath(cx, cy, r, d.startA, d.endA);
        const active = hover === i;
        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={d.color}
            strokeWidth={active ? strokeWidth + 5 : strokeWidth}
            strokeLinecap="butt"
            opacity={hover === null || hover === i ? 1 : 0.45}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <title>{`${d.name}: ${d.value}%`}</title>
          </path>
        );
      })}

      {centerLabel && (
        <text x={cx} y={cy - 2} fontSize={15} fontWeight={700} fill="#0F172A" textAnchor="middle">
          {centerValue ?? fmtNumber(total)}
        </text>
      )}
      {centerLabel && (
        <text x={cx} y={cy + 16} fontSize={11} fill={AXIS.y} textAnchor="middle">
          {centerLabel}
        </text>
      )}
    </svg>
  );
}