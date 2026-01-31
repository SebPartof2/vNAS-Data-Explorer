import type { ArtccData, ArtccListItem } from './types';

const API_BASE = 'https://data-api.vnas.vatsim.net/api';

export async function fetchArtcc(facilityId: string): Promise<ArtccData> {
  const response = await fetch(`${API_BASE}/artccs/${facilityId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch facility ${facilityId}: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchArtccList(): Promise<ArtccListItem[]> {
  // The full list endpoint is too large, so we'll use a predefined list
  // of known ARTCC IDs based on VATSIM structure
  const knownArtccs: ArtccListItem[] = [
    { id: 'ZAB', name: 'Albuquerque Center' },
    { id: 'ZAN', name: 'Anchorage Center' },
    { id: 'ZAU', name: 'Chicago Center' },
    { id: 'ZBW', name: 'Boston Center' },
    { id: 'ZDC', name: 'Washington Center' },
    { id: 'ZDV', name: 'Denver Center' },
    { id: 'ZFW', name: 'Fort Worth Center' },
    { id: 'ZHN', name: 'Honolulu Center' },
    { id: 'ZHU', name: 'Houston Center' },
    { id: 'ZID', name: 'Indianapolis Center' },
    { id: 'ZJX', name: 'Jacksonville Center' },
    { id: 'ZKC', name: 'Kansas City Center' },
    { id: 'ZLA', name: 'Los Angeles Center' },
    { id: 'ZLC', name: 'Salt Lake City Center' },
    { id: 'ZMA', name: 'Miami Center' },
    { id: 'ZME', name: 'Memphis Center' },
    { id: 'ZMP', name: 'Minneapolis Center' },
    { id: 'ZNY', name: 'New York Center' },
    { id: 'ZOA', name: 'Oakland Center' },
    { id: 'ZOB', name: 'Cleveland Center' },
    { id: 'ZSE', name: 'Seattle Center' },
    { id: 'ZSU', name: 'San Juan Center' },
    { id: 'ZTL', name: 'Atlanta Center' },
    { id: 'ZUA', name: 'Guam CERAP' },
  ];
  return knownArtccs.sort((a, b) => a.id.localeCompare(b.id));
}

export function formatFrequency(frequency: number): string {
  // Frequency is stored in Hz, convert to MHz
  return (frequency / 1000000).toFixed(3);
}

export function formatCoordinates(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}${latDir} ${Math.abs(lon).toFixed(4)}${lonDir}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function countNestedFacilities(facility: any): number {
  let count = 1;
  if (facility.childFacilities?.length) {
    for (const child of facility.childFacilities) {
      count += countNestedFacilities(child);
    }
  }
  return count;
}

export function flattenFacilities(facility: any): any[] {
  const facilities = [facility];
  if (facility.childFacilities?.length) {
    for (const child of facility.childFacilities) {
      facilities.push(...flattenFacilities(child));
    }
  }
  return facilities;
}

export function getAllPositions(facility: any): any[] {
  let positions = [...(facility.positions || [])];
  if (facility.childFacilities?.length) {
    for (const child of facility.childFacilities) {
      positions = positions.concat(getAllPositions(child));
    }
  }
  return positions;
}

export function findFacilityById(facility: any, id: string): any | null {
  if (facility.id === id) return facility;
  if (facility.childFacilities?.length) {
    for (const child of facility.childFacilities) {
      const found = findFacilityById(child, id);
      if (found) return found;
    }
  }
  return null;
}

export function getFacilityPath(facility: any, targetId: string, path: any[] = []): any[] | null {
  if (facility.id === targetId) return [...path, facility];
  if (facility.childFacilities?.length) {
    for (const child of facility.childFacilities) {
      const found = getFacilityPath(child, targetId, [...path, facility]);
      if (found) return found;
    }
  }
  return null;
}

export interface FacilityPathItem {
  artccId: string;
  facilityId: string;
  facility: any;
  path: any[];
}

export function getAllFacilityPaths(artccId: string, facility: any, path: any[] = []): FacilityPathItem[] {
  const currentPath = [...path, facility];
  const result: FacilityPathItem[] = [{
    artccId,
    facilityId: facility.id,
    facility,
    path: currentPath,
  }];

  if (facility.childFacilities?.length) {
    for (const child of facility.childFacilities) {
      result.push(...getAllFacilityPaths(artccId, child, currentPath));
    }
  }

  return result;
}
