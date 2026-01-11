import React from 'react';
import Select, { GroupBase } from 'react-select';

type TZOption = { value: string; label: string };
type TZGroup = GroupBase<TZOption>;

interface TimeZonePickerProps {
  value?: string;
  labels: Record<string, string>;
  onChange: (tz: string | null) => void;
  className?: string;
  classNamePrefix?: string;
  name?: string;
  noOptionsMessage?: () => string;
  styles?: any;
}

// const US_CANADA_LABELS: Record<string, string> = {
//   "America/Los_Angeles": "Pacific Time (PST) - US & Canada",
//   "America/Denver": "Mountain Time (MST) - US & Canada",
//   "America/Phoenix": "Arizona, Yukon Time - US & Canada",
//   "America/Chicago": "Central Time (CST) - US & Canada",
//   "America/New_York": "Eastern Time (EST) - US & Canada",
//   "America/Anchorage": "Alaska Time - US & Canada",
//   "America/St_Johns": "Newfoundland Time - US & Canada",
//   "Pacific/Honolulu": "Hawaii Time - US & Canada",
// };

function regionOf(tz: string): string {
  const region = tz.split('/')[0] || "Other";
  return region.toUpperCase();
}

// function humanLabel(tz: string): string {
//   if (tz === 'Etc/UTC' || tz === 'UTC') return 'UTC';
//   const parts = tz.split('/');
//   const city = parts[parts.length - 1].replace(/_/g, ' ');
//   return `${city} Time`;
// }

function buildGroupsFromLabels(labels: Record<string, string>): TZGroup[] {

  const favoriteIds = new Set([
    "America/Los_Angeles","America/Denver","America/Chicago","America/New_York",
    "America/Anchorage","America/Phoenix","America/St_Johns","Pacific/Honolulu",
  ])

  const territoryIds = new Set([
    "America/Puerto_Rico",
    "Pacific/Guam",
    "Pacific/Pago_Pago" // American Samoa
  ]);

  const favorites: TZOption[] = [];
  const territories: TZOption[] = [];
  const byRegion: Record<string, TZOption[]> = {};

  for (const tz of Object.keys(labels)) {

    const option: TZOption = { value: tz, label: labels[tz] };

    if (favoriteIds.has(tz)) favorites.push(option);
    else if (territoryIds.has(tz)) territories.push(option);
    else {
      const region = regionOf(tz);
      (byRegion[region] ||= []).push(option);
    }
  }

  favorites.sort((a, b) => a.label.localeCompare(b.label));
  territories.sort((a, b) => a.label.localeCompare(b.label));

  Object.values(byRegion).forEach(list => {
    list.sort((a, b) => a.label.localeCompare(b.label));
  });

  const groups: TZGroup[] = [];
  if (favorites.length > 0)
    groups.push({ label: 'US/CANADA', options: favorites });

  if (territories.length > 0) {
    groups.push({ label: 'US TERRITORIES', options: territories });
  }

  const sortedRegions = Object.keys(byRegion).sort();
  sortedRegions.forEach(region => {
    groups.push({ label: region, options: byRegion[region] });
  });

  return groups;
}

function isSelected(groups: TZGroup[], value?: string): TZOption | undefined {
  if (!value) return undefined;

  for (const group of groups) {
    const match = group.options.find(opt => opt.value === value);
    if (match) return match;
  }

  return undefined;
}

function offsetTextFor(tz: string): string {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'shortOffset'
  });

  const parts = dtf.formatToParts(new Date()).find(x => x.type === 'timeZoneName')?.value || '';
  return parts.replace('GMT', 'UTC');
}

const TimeZonePicker = (props: TimeZonePickerProps) => {

  const {
    value, labels, onChange, className, classNamePrefix, name, noOptionsMessage, styles
  } = props;

  const groups = buildGroupsFromLabels(labels);
  const selected = isSelected(groups, value);

  return (
    <Select
      options={groups}
      value={selected}
      onChange={(opt: TZOption | null) => onChange(opt ? opt.value : null)}
      className={className}
      classNamePrefix={classNamePrefix}
      name={name}
      noOptionsMessage={noOptionsMessage}
      styles={styles}
      formatOptionLabel={(opt: TZOption) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>{opt.label}</span>
          <span className="tz-offset d-none">{offsetTextFor(opt.value)}</span>
        </div>
      )}
    />
  );
}

export default TimeZonePicker;
