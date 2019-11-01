import { Fix, Track } from './parser';

const months: { [key: string]: number } = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

export function parse(content: string): Track[] {
  const fixes: Fix[] = [];
  const lines = content.split(/[\n\r]+/);

  lines.forEach(line => {
    let m;
    // T  A 49.34586726ºN 0.72568615ºW 01-NOV-10 15:54:34.000 N 51.6 0.0 0.1 0.0 0 -1000.0 9999999562023526247000000.0 -1 60.9 -1.0
    m = line.match(
      /^T\s+A ([\d.]+).([NS]) ([\d.]+).([EW]) (\d{2})-(\w{3})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.\d+ . (\d+)/,
    );
    if (m) {
      const lat = parseFloat(m[1]) * (m[2] == 'N' ? 1 : -1);
      const lon = parseFloat(m[3]) * (m[4] == 'E' ? 1 : -1);
      const date = new Date(
        2000 + parseInt(m[7], 10),
        months[m[6]] || 1,
        parseInt(m[5], 10),
        parseInt(m[8], 10),
        parseInt(m[9], 10),
        parseInt(m[10], 10),
      );
      const ts = date.getTime();
      const alt = parseInt(m[11], 10);
      fixes.push({ lat, lon, ts, alt });
    } else {
      // T  N45.6321216 E003.1162763 19-JUL-10 14:33:59 00785
      m = line.match(/^T\s+ ([NS])([\d.]+) ([EW])([\d.]+) (\d{2})-(\w{3})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\ (\d+)/);
      if (m) {
        const lat = parseFloat(m[2]) * (m[1] == 'N' ? 1 : -1);
        const lon = parseFloat(m[4]) * (m[3] == 'E' ? 1 : -1);
        const date = new Date(
          2000 + parseInt(m[7], 10),
          months[m[6]] || 1,
          parseInt(m[5], 10),
          parseInt(m[8], 10),
          parseInt(m[9], 10),
          parseInt(m[10], 10),
        );
        const ts = date.getTime();
        const alt = parseInt(m[11], 10);
        fixes.push({ lat, lon, ts, alt });
      }
    }
  });

  return fixes.length > 5 ? [{ fixes, pilot: 'unknown' }] : [];
}
