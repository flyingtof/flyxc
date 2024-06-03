import { getFixMessage, getTrackerDisplayName, isEmergencyFix, isLowBatFix, isValidFix } from '@flyxc/common';

import { liveTrackSelectors } from '../redux/live-track-slice';
import { store } from '../redux/store';
import type { Units } from './units';
import { formatUnit } from './units';

// Generates the content of the live tracking popup.
export function popupContent(
  trackId: string,
  index: number,
  units: Units,
): { title: string; content: string } | undefined {
  const track = liveTrackSelectors.selectById(store.getState(), trackId);
  if (!track) {
    return undefined;
  }
  const message = getFixMessage(track, index);
  const flags = track.flags[index];
  const alt = track.alt[index];
  const speed = track.extra[index]?.speed;
  const gndAlt = track.extra[index]?.gndAlt;
  const date = new Date(track.timeSec[index] * 1000);

  const content: string[] = [
    `<i class="las la-clock"></i> ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    `<i class="las la-arrows-alt-v"></i> ${formatUnit(alt, units.altitude)} ${
      gndAlt == null ? '' : `(${formatUnit(Math.max(0, alt - gndAlt), units.altitude)} AGL)`
    }`,
  ];
  if (speed != null) {
    content.push(`<i class="las la-tachometer-alt"></i> ${formatUnit(speed, units.speed)}`);
  }
  content.push(
    `<i class="las la-map-marked"></i> <a href=${`https://www.google.com/maps/search/?api=1&query=${track.lat[index]},${track.lon[index]}`} target="_blank">Directions</a> to ${
      track.lat[index]
    }, ${track.lon[index]}`,
  );
  if (message != null) {
    content.push(`<i class="las la-sms"></i> “${message}”`);
  }
  if (isEmergencyFix(flags)) {
    content.push('<i class="las la-first-aid"></i> <strong>Emergency</strong>');
  }
  if (isLowBatFix(flags)) {
    content.push('<i class="las la-battery-empty"></i> Low Battery.');
  }
  if (!isValidFix(flags)) {
    content.push(
      '<i class="las la-exclamation-circle"></i> <strong>Warning</strong>',
      'The GPS fix is reported as invalid.',
      'The actual location might be different.',
    );
  }
  content.push(`<i class="las la-satellite-dish"></i> ${getTrackerDisplayName(flags)}`);

  return {
    title: track.name ?? 'unknown',
    content: content.join('<br>'),
  };
}
