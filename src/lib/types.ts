// vNAS Data API Types

export interface ArtccData {
  id: string;
  lastUpdatedAt: string;
  facility: Facility;
  positions: Position[];
  eramConfiguration?: EramConfiguration;
  visibilityCenters: [number, number][];
  aliasesLastUpdatedAt?: string;
  videoMaps: VideoMap[];
  transceivers: Transceiver[];
  restrictions: Restriction[];
  autoAtcRules: AutoAtcRule[];
}

export interface Facility {
  id: string;
  type: FacilityType;
  name: string;
  childFacilities: Facility[];
  starsConfiguration?: StarsConfiguration;
  towerCabConfiguration?: TowerCabConfiguration;
  asdexConfiguration?: AsdexConfiguration;
  tdlsConfiguration?: TdlsConfiguration;
  flightStripsConfiguration?: FlightStripsConfiguration;
  positions: Position[];
  eramConfiguration?: EramConfiguration;
  neighboringFacilityIds: string[];
  nonNasFacilityIds: string[];
}

export type FacilityType = 'ARTCC' | 'TRACON' | 'ATCT' | 'RAPCON' | 'FSS';

export interface Position {
  id: string;
  name: string;
  radioName: string;
  callsign: string;
  frequency: number;
  starred: boolean;
  transceiverIds: string[];
  starsConfiguration?: PositionStarsConfiguration;
  eramConfiguration?: PositionEramConfiguration;
}

export interface PositionStarsConfiguration {
  areaId?: string;
  sectorId?: string;
  subsetId?: string;
}

export interface PositionEramConfiguration {
  sectorId?: string;
}

export interface StarsConfiguration {
  areas: StarsArea[];
  internalAirports: string[];
  beaconCodeBanks: BeaconCodeBank[];
  rpcs: RpcConfiguration[];
  tcps: TcpConfiguration[];
  videoMapIds: string[];
  primaryScratchpadRules: ScratchpadRule[];
  secondaryScratchpadRules: ScratchpadRule[];
  geoMaps: GeoMap[];
}

export interface StarsArea {
  id: string;
  name: string;
  visibilityCenter: Coordinates;
  surveillanceRange: number;
  underlyingAirports: string[];
  ssaAirports: string[];
  towerListConfigurations: TowerListConfiguration[];
  displayOnMsl: boolean;
  acceptsHandoffs: boolean;
  acceptsPointOuts: boolean;
  forceQuickLook: boolean;
  skipStaticCrdpIndicator: boolean;
  enableTrackAirspeedFallback: boolean;
  fixedAltitudeVolumes: FixedAltitudeVolume[];
  altimeterStations: AltimeterStation[];
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface TowerListConfiguration {
  id: number;
  airportId: string;
  range: number;
}

export interface FixedAltitudeVolume {
  id: string;
  name: string;
  altitude: number;
  points: Coordinates[];
}

export interface AltimeterStation {
  airportId: string;
  isPrimary: boolean;
}

export interface BeaconCodeBank {
  id: string;
  type: string;
  start: number;
  end: number;
}

export interface RpcConfiguration {
  id: string;
  position: Coordinates;
  primaryAirports: string[];
  secondaryAirports: string[];
}

export interface TcpConfiguration {
  id: string;
  domain: string;
  airportId: string;
  runways: TcpRunway[];
}

export interface TcpRunway {
  id: string;
  defaultLeaderDirection: number;
}

export interface ScratchpadRule {
  pattern: string;
  replacement: string;
}

export interface GeoMap {
  id: string;
  name: string;
  labelLine1: string;
  labelLine2: string;
  filterMenu: number[];
  objects: GeoMapObject[];
}

export interface GeoMapObject {
  type: string;
  records: GeoMapRecord[];
}

export interface GeoMapRecord {
  type: string;
  points?: Coordinates[];
  text?: string;
  textPosition?: Coordinates;
}

export interface TowerCabConfiguration {
  displayOptions: TowerDisplayOptions;
}

export interface TowerDisplayOptions {
  mapOrientation: number;
  displayRange: number;
  showRangeRings: boolean;
}

export interface AsdexConfiguration {
  enabled: boolean;
  surfaceMovementRadius: number;
  centerOnAirport: boolean;
}

export interface TdlsConfiguration {
  mandatorySid: boolean;
  mandatoryClimbout: boolean;
  mandatoryClimbvia: boolean;
  mandatoryInitialAlt: boolean;
  mandatoryDepFreq: boolean;
  mandatoryExpect: boolean;
  sids: Sid[];
  climbouts: TdlsOption[];
  climbvias: TdlsOption[];
  initialAlts: TdlsOption[];
  depFreqs: TdlsOption[];
  expects: TdlsOption[];
  contactInfos: TdlsOption[];
  localInfos: TdlsOption[];
}

export interface Sid {
  id: string;
  name: string;
  transitions: SidTransition[];
}

export interface SidTransition {
  id: string;
  name: string;
  firstRoutePoint: string;
  defaultExpect?: string;
  defaultClimbout?: string;
  defaultClimbvia?: string;
  defaultInitialAlt?: string;
  defaultDepFreq?: string;
}

export interface TdlsOption {
  id: string;
  value: string;
}

export interface FlightStripsConfiguration {
  enabled: boolean;
  bays: FlightStripBay[];
}

export interface FlightStripBay {
  id: string;
  name: string;
  racks: FlightStripRack[];
}

export interface FlightStripRack {
  id: string;
  name: string;
}

export interface EramConfiguration {
  sectors: EramSector[];
  emergencyChecklist: string[];
  nasRoutes: NasRoute[];
  preferentialRoutes: PreferentialRoute[];
  adrRestrictions: AdrRestriction[];
  coordinationFixes: CoordinationFix[];
  internalAirports: string[];
  referencePoints: ReferencePoint[];
  conflictAlertFloors: ConflictAlertFloor[];
  beaconCodeBanks: BeaconCodeBank[];
  airspaceElements: AirspaceElement[];
  airways: Airway[];
}

export interface EramSector {
  id: string;
  name: string;
  areaId: string;
  feederSectorIds: string[];
  interdepAdjacentSectorIds: string[];
  handoffToSectorIds: string[];
  primaryAirports: string[];
  secondaryAirports: string[];
  fieldE: number;
  fieldEEnabledRequiresAltitude: boolean;
  hasActiveRunway: boolean;
  runways: EramRunway[];
  subsets: EramSubset[];
  volumes: EramVolume[];
  alternateSectors: EramAlternateSector[];
  conflictAlertFloor: number;
}

export interface EramRunway {
  airportId: string;
  runwayId: string;
}

export interface EramSubset {
  id: string;
  name: string;
}

export interface EramVolume {
  id: string;
  floor: number;
  ceiling: number;
  points: Coordinates[];
}

export interface EramAlternateSector {
  id: string;
  priority: number;
}

export interface NasRoute {
  id: string;
  routeText: string;
}

export interface PreferentialRoute {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  routeText: string;
}

export interface AdrRestriction {
  id: string;
  routeText: string;
  applicability: string;
}

export interface CoordinationFix {
  id: string;
  name: string;
  type: string;
  position: Coordinates;
  coordinationTimeLead: number;
  coordinationTimeTrail: number;
}

export interface ReferencePoint {
  id: string;
  name: string;
  position: Coordinates;
  type: string;
}

export interface ConflictAlertFloor {
  id: string;
  altitude: number;
  points: Coordinates[];
}

export interface AirspaceElement {
  id: string;
  name: string;
  type: string;
  floor: number;
  ceiling: number;
  points: Coordinates[];
}

export interface Airway {
  id: string;
  type: string;
  fixes: string[];
}

export interface VideoMap {
  id: string;
  name: string;
  sourceFileName: string;
  tags: string[];
  lastUpdatedAt: string;
  starsBrightnessCategory?: string;
  starsId?: number;
  starsAlwaysVisible: boolean;
  tdmOnly: boolean;
}

export interface Transceiver {
  id: string;
  name: string;
  frequency: number;
  latDeg: number;
  lonDeg: number;
  heightMslM: number;
  heightAglM: number;
}

export interface Restriction {
  id: string;
  name: string;
  type: string;
  description: string;
  active: boolean;
}

export interface AutoAtcRule {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  conditions: AutoAtcCondition[];
  actions: AutoAtcAction[];
}

export interface AutoAtcCondition {
  type: string;
  value: string;
}

export interface AutoAtcAction {
  type: string;
  value: string;
}

// API response for list of ARTCCs
export interface ArtccListItem {
  id: string;
  name: string;
}
