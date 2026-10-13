import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Key, 
  Sun, 
  Moon, 
  RefreshCw, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight,
  User,
  UserPlus,
  Radio,
  Lock,
  Mic,
  Keyboard,
  Camera,
  Send,
  CheckCircle2,
  Globe,
  X,
  Eye,
  EyeOff,
  XCircle,
  LogOut,
  BarChart3,
  ClipboardList,
  Sparkles,
  MapPin,
  Navigation,
  ShieldAlert,
  Map,
  Users,
  Flame,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Home,
  History,
  Archive,
  Filter,
  Clock,
  Siren,
  Stethoscope,
  Car,
  Search,
  PlusCircle,
  DoorOpen,
  DoorClosed,
  QrCode,
  TrendingUp,
  Cpu,
  Compass,
  Building,
  Truck,
  FileCheck,
  Sliders,
  Brain,
  Zap,
  Volume2,
  VolumeX,
  Activity,
  ArrowUpRight,
  Download,
  FileText,
  Plus,
  CheckSquare,
  Layers,
  Info,
  Printer,
  RotateCcw,
  FileSpreadsheet
} from 'lucide-react';

const THEMES = {
  light: {
    bgPage: '#FBEFEF',
    bgCard: '#FFF2DB',
    btnAuth: '#FFE5BF',
    btnAuthHover: '#F2D3A7',
    textPrimary: '#3D2C2E',
    textMuted: '#7A6265',
    border: '#E8D3B8',
    cardShadow: 'rgba(61, 44, 46, 0.08)',
    inputBg: '#FFFDF9'
  },
  dark: {
    bgPage: '#0B192C',
    bgCard: '#071E3D',
    btnAuth: '#1E293B',
    btnAuthHover: '#334155',
    textPrimary: '#F1F5F9',
    textMuted: '#94A3B8',
    border: '#353941',
    cardShadow: 'rgba(0, 0, 0, 0.5)',
    inputBg: '#0F172A'
  }
};

const VALID_USERS = [
  { badgeId: 'AUTH-8821', pin: '7749', name: 'Officer Alex Mercer', role: 'Security Ops Lead', clearance: 'Level 4 Command' },
  { badgeId: 'EMP-1001', pin: '1234', name: 'Dr. Sarah Connor', role: 'Senior Systems Admin', clearance: 'Level 3 Admin' }
];

const INITIAL_ENTRY_LOGS = [
  { id: 'ENT-9012', name: 'Marcus Vance', type: 'Contractor', idNumber: 'GOV-88192', zone: 'Server Room B', timeIn: '08:45 AM', status: 'ACTIVE' },
  { id: 'ENT-9013', name: 'Elena Rostova', type: 'Executive Staff', idNumber: 'EMP-3042', zone: 'Command Hub 01', timeIn: '09:10 AM', status: 'ACTIVE' },
  { id: 'ENT-9014', name: 'TechSolutions Courier', type: 'Delivery', idNumber: 'VAN-7718', zone: 'Loading Bay 03', timeIn: '09:30 AM', status: 'CHECKED_OUT' }
];

const INITIAL_EMERGENCY_ALERTS = [
  {
    id: 'EMG-882190',
    dispatchId: 'EMG-882190',
    category: 'Fire Help',
    text: 'Accident and fire breakdown near Gate 02 Loading Bay. Large crowd rapidly assembling around service ramp.',
    language: 'English',
    langFlag: '🇺🇸',
    time: '09:42 AM',
    date: 'Today',
    photo: null,
    location: {
      lat: 28.5355,
      lng: 77.3910,
      address: 'Zone 02 Service Ramp, Sector 62',
      accuracy: '3.8 meters',
      city: 'Noida Command Grid'
    },
    crowdData: {
      densityLevel: 'HIGH',
      estimatedCount: 88,
      trend: 'Gathering Rapidly (+18 in last 5m)',
      congestionStatus: 'HEAVY TRAFFIC DELAY',
      hotspots: [
        { id: 1, name: 'Core Incident Site (Gate 02)', count: 56, latOffset: 0.0001, lngOffset: 0.0001, intensity: 'CRITICAL' },
        { id: 2, name: 'Service Ramp Junction', count: 32, latOffset: -0.0003, lngOffset: -0.0002, intensity: 'MODERATE' }
      ]
    },
    status: 'ACTIVE_DISPATCH',
    assignedOfficer: 'Officer Alex Mercer',
    resolvedAt: null
  },
  {
    id: 'EMG-771204',
    dispatchId: 'EMG-771204',
    category: 'Medical Emergency',
    text: 'चिकित्सा सहायता चाहिए - Senior staff collapsed in Server Room B.',
    language: 'हिन्दी (Hindi)',
    langFlag: '🇮🇳',
    time: '08:15 AM',
    date: 'Today',
    photo: null,
    location: {
      lat: 28.5380,
      lng: 77.3942,
      address: 'Building B, Floor 2, Server Bay',
      accuracy: '2.1 meters',
      city: 'Noida Command Grid'
    },
    crowdData: {
      densityLevel: 'LOW (NORMAL)',
      estimatedCount: 4,
      trend: 'Crowd Dispersed • Traffic Restored',
      congestionStatus: 'ROAD CLEAR & FLOWING',
      hotspots: [
        { id: 1, name: 'Server Bay Hallway', count: 3, latOffset: 0.0001, lngOffset: 0.0001, intensity: 'LOW' },
        { id: 2, name: 'Elevator Lobby B', count: 1, latOffset: -0.0001, lngOffset: 0.0002, intensity: 'LOW' }
      ]
    },
    status: 'RESOLVED',
    assignedOfficer: 'Dr. Sarah Connor',
    resolvedAt: {
      date: 'Today',
      time: '08:42 AM',
      timestamp: Date.now() - 3600000
    }
  }
];

const INITIAL_HABITATIONS = [
  { 
    id: 'hab-1', 
    name: 'Kalyani Village Upper (Red Hazard Zone)', 
    district: 'Uttarkashi / Bhatwari', 
    state: 'Uttarakhand',
    pop: 1420, 
    families: 284,
    kuchaHouses: 198,
    puccaHouses: 86,
    elderly: 180, 
    infants: 110, 
    pwd: 65, 
    hazard: 'Active Landslide & Mudflow Scour', 
    cvs: 0.88, 
    tier: 'Tier 1 (Immediate Evacuation)', 
    priority: 'CRITICAL',
    status: 'RED_ALERT', 
    lat: 30.7380, 
    lng: 78.4420,
    scores: { flood: 85, landslide: 94, seismic: 78, terrain: 90, structural: 88, demographic: 82, infra: 85 }
  },
  { 
    id: 'hab-2', 
    name: 'Raini High Settlement (Red Hazard Zone)', 
    district: 'Chamoli / Joshimath', 
    state: 'Uttarakhand',
    pop: 890, 
    families: 178,
    kuchaHouses: 132,
    puccaHouses: 46,
    elderly: 95, 
    infants: 62, 
    pwd: 38, 
    hazard: 'Glacial Outburst & Flash Surge', 
    cvs: 0.82, 
    tier: 'Tier 1 (Immediate Evacuation)', 
    priority: 'CRITICAL',
    status: 'RED_ALERT', 
    lat: 30.7210, 
    lng: 78.4280,
    scores: { flood: 96, landslide: 82, seismic: 84, terrain: 88, structural: 80, demographic: 76, infra: 82 }
  },
  { 
    id: 'hab-3', 
    name: 'Bagori Hamlet Lower', 
    district: 'Uttarkashi / Harsil', 
    state: 'Uttarakhand',
    pop: 650, 
    families: 130,
    kuchaHouses: 72,
    puccaHouses: 58,
    elderly: 65, 
    infants: 40, 
    pwd: 27, 
    hazard: 'Flash Flood & River Scour', 
    cvs: 0.76, 
    tier: 'Tier 1 (Immediate Evacuation)', 
    priority: 'HIGH',
    status: 'YELLOW_ALERT', 
    lat: 30.7490, 
    lng: 78.4550,
    scores: { flood: 88, landslide: 65, seismic: 70, terrain: 72, structural: 74, demographic: 70, infra: 68 }
  },
  { 
    id: 'hab-4', 
    name: 'Dharasu Slope Colony', 
    district: 'Uttarkashi / Dunda', 
    state: 'Uttarakhand',
    pop: 2100, 
    families: 420,
    kuchaHouses: 180,
    puccaHouses: 240,
    elderly: 210, 
    infants: 150, 
    pwd: 80, 
    hazard: 'Unstable Shear Stratum', 
    cvs: 0.64, 
    tier: 'Tier 2 (Short-Term)', 
    priority: 'MODERATE',
    status: 'YELLOW_ALERT', 
    lat: 30.7100, 
    lng: 78.4100,
    scores: { flood: 55, landslide: 78, seismic: 68, terrain: 70, structural: 62, demographic: 60, infra: 58 }
  }
];

const INITIAL_CANDIDATE_SITES = [
  { id: 'site-1', name: 'Site Alpha - Chinyalisaur Ridge (Green Safe Field)', type: 'Green Site (Permanent)', maxCapacity: 4500, allocatedPop: 2070, waterSupply: '135 L/Capita/Day', lat: 30.7600, lng: 78.4800, accessibility: 'Flat Terrain (Elderly/PwD Accessible)', status: 'GREEN_SAFE' },
  { id: 'site-2', name: 'Site Beta - New Tehri Sector 4 (Green Safe Field)', type: 'Green Site (Permanent)', maxCapacity: 5000, allocatedPop: 890, waterSupply: '150 L/Capita/Day', lat: 30.6800, lng: 78.4700, accessibility: 'Full Medical Facility Integrated', status: 'GREEN_SAFE' },
  { id: 'site-3', name: 'Transit Hub Yellow - Bhatwari Stadium', type: 'Yellow Hub (24-72h Transit)', maxCapacity: 2200, allocatedPop: 350, waterSupply: '100 L/Capita/Day', lat: 30.7300, lng: 78.4500, accessibility: 'Rapid Highway Transit Shelter', status: 'YELLOW_HUB' }
];

const INITIAL_CROWD_ZONES = [
  { id: 'zone-1', name: 'Gate 02 Loading Bay & Service Ramp', lat: 28.5355, lng: 77.3910, count: 88, maxCap: 95, density: 92, level: 'RED', category: 'High Alert Crowd Surge', trend: '+18 in last 5m' },
  { id: 'zone-2', name: 'Central Sector Command Square', lat: 28.5370, lng: 77.3925, count: 145, maxCap: 160, density: 84, level: 'RED', category: 'Mass Human Gathering', trend: '+22 in last 5m' },
  { id: 'zone-3', name: 'Uttarkashi Evacuation Hub Junction', lat: 30.7380, lng: 78.4420, count: 120, maxCap: 135, density: 88, level: 'RED', category: 'Evacuation Congestion', trend: '+15 in last 5m' },
  { id: 'zone-4', name: 'Building B Server Lobby & Corridor', lat: 28.5380, lng: 77.3942, count: 35, maxCap: 75, density: 48, level: 'YELLOW', category: 'Moderate Footfall', trend: '-2 in last 5m' },
  { id: 'zone-5', name: 'Assembly Site Alpha (Chinyalisaur)', lat: 30.7600, lng: 78.4800, count: 12, maxCap: 4500, density: 15, level: 'GREEN', category: 'Clear Safe Zone', trend: 'Dispersed' }
];

const LANGUAGES = [
  { code: 'en-US', name: 'English', flag: '🇺🇸', quickPhrases: ['Need Medical Help', 'Fire Breakdown', 'Police Emergency', 'Accident at Location'] },
  { code: 'hi-IN', name: 'हिन्दी (Hindi)', flag: '🇮🇳', quickPhrases: ['चिकित्सा सहायता चाहिए', 'आग लगी है', 'पुलिस आपातकाल', 'दुर्घटना हुई है'] },
  { code: 'es-ES', name: 'Español (Spanish)', flag: '🇪🇸', quickPhrases: ['Necesito ayuda médica', 'Emergencia de incendio', 'Llamen a la policía', 'Accidente grave'] },
  { code: 'fr-FR', name: 'Français (French)', flag: '🇫🇷', quickPhrases: ["Besoin d'aide médicale", 'Urgence incendie', 'Appelez la police', 'Accident de la route'] }
];

const VIRTUAL_KEYBOARD_LAYOUTS = {
  'en-US': [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.']
  ],
  'hi-IN': [
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
    ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ'],
    ['त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म']
  ]
};

const HAZARD_SIM_SCENARIOS = [
  { id: 'scen-1', name: 'Torrential Cloudburst & Flash Flood', riskEscalation: 45, desc: '+45% Peak Rainfall Inundation & River Scour', icon: Flame },
  { id: 'scen-2', name: 'Richter 6.8 Fault Line Seismic Shock', riskEscalation: 65, desc: '+65% Masonry Shear & Structural Ground Shaking', icon: AlertTriangle },
  { id: 'scen-3', name: 'Saturated Monsoonal Mudflow & Scour', riskEscalation: 80, desc: '+80% Rapid Slope Deformation & Saturated Scour', icon: Sliders },
  { id: 'scen-4', name: 'Glacial Outburst Surge (GLOF)', riskEscalation: 95, desc: '+95% Extreme Debris Surge & Downstream Inundation', icon: Zap }
];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('authorized_portal'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('select_role');
  const [, setSelectedRole] = useState(null);
  
  const [toastMessage, setToastMessage] = useState(null);
  const [sessionTime, setSessionTime] = useState(new Date().toLocaleTimeString());

  const [badgeIdInput, setBadgeIdInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(VALID_USERS[0]);

  const [emergencyAlerts, setEmergencyAlerts] = useState(INITIAL_EMERGENCY_ALERTS);
  const [selectedEmergencyForMap, setSelectedEmergencyForMap] = useState(null);

  const [mapLayerType, setMapLayerType] = useState('roadmap');
  const [showCrowdHeatmap, setShowCrowdHeatmap] = useState(true);
  const [mapZoomLevel, setMapZoomLevel] = useState(16);
  const [leafletReady, setLeafletReady] = useState(false);

  const [activePortalTab, setActivePortalTab] = useState('system_analytics');
  const [accessSubTab, setAccessSubTab] = useState('entry_log');
  const [analyticsSubTab, setAnalyticsSubTab] = useState('gis_map');
  const [crowdFilter, setCrowdFilter] = useState('ALL');
  const [crowdZones, setCrowdZones] = useState(INITIAL_CROWD_ZONES);

  const [historyCategoryFilter, setHistoryCategoryFilter] = useState('ALL');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  
  const [entryLogs, setEntryLogs] = useState(INITIAL_ENTRY_LOGS);
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [gatesStatus, setGatesStatus] = useState({
    gate01: 'UNLOCKED',
    gate02: 'LOCKED',
    gate03: 'UNLOCKED'
  });

  const [newEntrantName, setNewEntrantName] = useState('');
  const [newEntrantType, setNewEntrantType] = useState('Visitor');
  const [newEntrantId, setNewEntrantId] = useState('');
  const [newEntrantZone, setNewEntrantZone] = useState('Main Reception');

  const [generatedPass, setGeneratedPass] = useState(null);
  const [passRecipientName, setPassRecipientName] = useState('');
  const [passZone, setPassZone] = useState('Level 2 Office Bay');

  const [selectedLang, setSelectedLang] = useState('en-US');
  const [emergencyCategoryInput, setEmergencyCategoryInput] = useState('Medical Emergency');
  const [isListening, setIsListening] = useState(false);
  const [emergencyText, setEmergencyText] = useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [attachedPhoto, setAttachedPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchId, setDispatchId] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const [showConfirmHomeModal, setShowConfirmHomeModal] = useState(false);
  const [showConfirmSignOutModal, setShowConfirmSignOutModal] = useState(false);

  // Decision Support System Analytics State
  const [habitations, setHabitations] = useState(INITIAL_HABITATIONS);
  const [candidateSites, setCandidateSites] = useState(INITIAL_CANDIDATE_SITES);
  const [selectedHabId, setSelectedHabId] = useState('hab-1');
  const [selectedSiteId, setSelectedSiteId] = useState('site-1');
  const [gisTileStyle, setGisTileStyle] = useState('satellite');

  // Tactical SOS & Audio Siren State
  const [selectedSosTargetZone, setSelectedSosTargetZone] = useState('zone-1');
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [activeSirenMessage, setActiveSirenMessage] = useState('');

  const [tacticalSosQueue, setTacticalSosQueue] = useState([
    { id: 'sos-1', type: 'Critical Medical Evacuation', target: 'Gate 02 Service Ramp', time: '2 mins ago', status: 'NDRF Unit Dispatched', eta: '6 Mins' },
    { id: 'sos-2', type: 'High Density Surge Alert', target: 'Central Sector Command Square', time: '7 mins ago', status: 'En-Route', eta: '11 Mins' }
  ]);

  const [aiInspectLoading, setAiInspectLoading] = useState(false);
  const [aiInspectError, setAiInspectError] = useState(null);
  const [aiInspectResult, setAiInspectResult] = useState(null);

  const [selectedScenarioId, setSelectedScenarioId] = useState('scen-1');
  const [simShockValue, setSimShockValue] = useState(45);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, time: '10:42 AM', user: 'Officer Alex Mercer', action: 'Approved Tier 1 Relocation match for Kalyani Village to Chinyalisaur Ridge.', category: 'Relocation Order' },
    { id: 2, time: '09:15 AM', user: 'Dr. Sarah Connor', action: 'Dispatched Tactical Rescue Unit to Server Room B.', category: 'Dispatches' }
  ]);
  const [auditCategoryFilter, setAuditCategoryFilter] = useState('ALL');
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [customAuditNote, setCustomAuditNote] = useState('');
  const [customAuditCategory, setCustomAuditCategory] = useState('System Overrides');

  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const leafletMapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapMarkersGroupRef = useRef(null);
  const analyticsMapRef = useRef(null);
  const analyticsMapInstanceRef = useRef(null);

  const currentTheme = THEMES[theme];

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.L) {
      setLeafletReady(true);
      return;
    }

    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCss);

    const leafletJs = document.createElement('script');
    leafletJs.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJs.onload = () => {
      setLeafletReady(true);
    };
    document.head.appendChild(leafletJs);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: `${position.coords.accuracy.toFixed(1)} meters`,
            address: 'GPS Live Coordinates Acquired',
            city: 'Noida Metro Region'
          });
        },
        () => {
          setCurrentLocation({
            lat: 28.5355,
            lng: 77.3910,
            accuracy: '4.5 meters (GPS)',
            address: 'Command Sector 62, Gate 01 Tower',
            city: 'Noida Regional Hub'
          });
        }
      );
    }
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setEmergencyText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedEmergencyForMap || !leafletReady || !mapContainerRef.current) return;

    const L = window.L;
    const { lat, lng } = selectedEmergencyForMap.location;

    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    const tileUrls = {
      roadmap: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      satellite: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      terrain: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
    };

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: mapZoomLevel,
      zoomControl: false,
      attributionControl: false
    });

    leafletMapRef.current = map;

    L.tileLayer(tileUrls[mapLayerType] || tileUrls.roadmap, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    mapMarkersGroupRef.current = markersGroup;

    const isResolved = selectedEmergencyForMap.status === 'RESOLVED';

    const pinHtml = isResolved ? `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.5); font-weight: bold; font-size: 18px;">
          ✓
        </div>
      </div>
    ` : `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(220, 38, 38, 0.4); animation: ping 1.5s infinite;"></div>
        <div style="width: 34px; height: 34px; border-radius: 50%; background: #dc2626; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); font-weight: bold;">
          📍
        </div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: pinHtml,
      className: 'custom-map-pin',
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    const incidentMarker = L.marker([lat, lng], { icon: customIcon }).addTo(markersGroup);
    incidentMarker.bindPopup(`
      <div style="font-family: system-ui; font-size: 12px; padding: 4px;">
        <strong style="color: ${isResolved ? '#059669' : '#dc2626'};">${isResolved ? '✅ Issue Resolved - Road Clear' : '🚨 Emergency Incident Core'}</strong><br/>
        <b>Category:</b> ${selectedEmergencyForMap.category || 'General'}<br/>
        <b>Address:</b> ${selectedEmergencyForMap.location.address}<br/>
        <b>Road Condition:</b> ${isResolved ? 'Road Clear & Flowing' : `Est. Crowd: ~${selectedEmergencyForMap.crowdData?.estimatedCount || 40} People`}
      </div>
    `).openPopup();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [selectedEmergencyForMap, leafletReady, mapLayerType, showCrowdHeatmap, mapZoomLevel]);

  useEffect(() => {
    if (activePortalTab !== 'system_analytics' || analyticsSubTab !== 'gis_map' || !leafletReady || !analyticsMapRef.current) return;

    const L = window.L;
    if (analyticsMapInstanceRef.current) {
      analyticsMapInstanceRef.current.remove();
      analyticsMapInstanceRef.current = null;
    }

    const tileUrls = {
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      topo: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    };

    const map = L.map(analyticsMapRef.current, {
      center: [28.5355, 77.3910],
      zoom: 14,
      zoomControl: true,
      attributionControl: false
    });

    analyticsMapInstanceRef.current = map;

    L.tileLayer(tileUrls[gisTileStyle] || tileUrls.satellite, { maxZoom: 19 }).addTo(map);

    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 200);

    const filteredZones = crowdZones.filter(z => crowdFilter === 'ALL' || z.level === crowdFilter);

    filteredZones.forEach((zone) => {
      let color = '#10b981'; 
      if (zone.level === 'RED') color = '#ef4444'; 
      if (zone.level === 'YELLOW') color = '#f59e0b'; 

      const radiusMeters = zone.level === 'RED' ? 450 : (zone.level === 'YELLOW' ? 280 : 150);

      L.circle([zone.lat, zone.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.35,
        weight: 2,
        radius: radiusMeters
      }).addTo(map);

      const pinHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          ${zone.level === 'RED' ? '<div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: rgba(239, 68, 68, 0.5); animation: ping 1.5s infinite;"></div>' : ''}
          <div style="width: 24px; height: 24px; border-radius: 50%; background: ${color}; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.6); font-weight: bold; font-size: 11px;">
            ${zone.level === 'RED' ? '🚨' : (zone.level === 'YELLOW' ? '⚠️' : '✓')}
          </div>
        </div>
      `;
      const customIcon = L.divIcon({ html: pinHtml, className: 'crowd-gis-pin', iconSize: [24, 24], iconAnchor: [12, 12] });

      const marker = L.marker([zone.lat, zone.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: system-ui; font-size: 12px; padding: 2px; min-width: 180px;">
          <strong style="color: ${color}; font-size: 13px;">${zone.name}</strong><br/>
          <div style="margin-top: 4px; padding: 6px; background: rgba(0,0,0,0.05); border-radius: 8px; font-size: 11px;">
            <b>Tracked Humans:</b> ${zone.count} / ${zone.maxCap}<br/>
            <b>Density:</b> ${zone.density}% (${zone.level} ALERT)<br/>
            <b>Trend:</b> ${zone.trend}
          </div>
        </div>
      `);
    });

    habitations.forEach((hab) => {
      const isRed = hab.cvs >= 0.75;
      const circleColor = isRed ? '#ef4444' : '#f59e0b';
      
      const pinHtml = `<div style="width:20px;height:20px;background:${circleColor};border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:10px;">🏠</div>`;
      const customIcon = L.divIcon({ html: pinHtml, className: 'hab-gis-pin', iconSize: [20, 20], iconAnchor: [10, 10] });

      const marker = L.marker([hab.lat, hab.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: system-ui; font-size: 12px; padding: 2px;">
          <strong style="color: ${circleColor}; font-size: 13px;">${hab.name}</strong><br/>
          <b>Hazard:</b> ${hab.hazard}<br/>
          <b>Population:</b> ${hab.pop} Citizens (${hab.families} Families)<br/>
          <b>CVS Score:</b> ${hab.cvs} (${hab.tier})<br/>
          <button id="btn-inspect-${hab.id}" style="margin-top:6px;width:100%;padding:4px 8px;background:#9333ea;color:white;border:none;border-radius:6px;font-weight:bold;font-size:11px;cursor:pointer;">
            Run Gemini AI Inspector 🧠
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-inspect-${hab.id}`);
        if (btn) {
          btn.onclick = () => {
            setSelectedHabId(hab.id);
            setAnalyticsSubTab('ai_inspector');
            callGeminiAiInspection(hab);
          };
        }
      });
    });

    return () => {
      if (analyticsMapInstanceRef.current) {
        analyticsMapInstanceRef.current.remove();
        analyticsMapInstanceRef.current = null;
      }
    };
  }, [activePortalTab, analyticsSubTab, leafletReady, gisTileStyle, crowdZones, crowdFilter, habitations]);

  const triggerAudioSirenAndVoiceAlert = (zoneName) => {
    setIsSirenActive(true);
    const alertMessage = `EMERGENCY SOS ALERT ACTIVATED! ALL FIRST RESPONDERS DISPATCHED TO RED HAZARD ZONE: ${zoneName}! EVACUATE IMMEDIATE AREA NOW!`;
    setActiveSirenMessage(alertMessage);

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);

        for (let i = 0; i < 3; i++) {
          osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.4 + i * 0.8);
          osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.8 + i * 0.8);
        }

        gainNode.gain.setValueAtTime(0.35, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.5);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 2.5);
      }
    } catch (e) {
      console.warn("Web Audio Context restriction handled.");
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(alertMessage);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      utterance.onend = () => setIsSirenActive(false);
      utterance.onerror = () => setIsSirenActive(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSirenActive(false), 3000);
    }
  };

  const stopAudioSirenAndVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSirenActive(false);
    setActiveSirenMessage('');
  };

  const callGeminiAiInspection = async (targetHabInput) => {
    setAiInspectLoading(true);
    setAiInspectError(null);

    const targetHab = targetHabInput || habitations.find((h) => h.id === selectedHabId) || habitations[0];
    const nearestSite = candidateSites[0];

    const systemPrompt = `Act as the Lead Structural & Disaster Risk Analyst for the State Disaster Management Authority (SDMA) and NDRF Command. Analyze the provided habitation telemetry and generate a structured, highly realistic disaster risk assessment.`;

    const userQuery = `Analyze disaster vulnerability for:
Habitation: ${targetHab.name}
District: ${targetHab.district}, ${targetHab.state}
Population: ${targetHab.pop} citizens (${targetHab.families} families, ${targetHab.elderly} elderly, ${targetHab.infants} infants, ${targetHab.pwd} persons with disability)
Housing Profile: ${targetHab.kuchaHouses} Kucha (mud/straw) houses, ${targetHab.puccaHouses} Pucca (masonry) houses
Primary Hazard: ${targetHab.hazard}
Current CVS Score: ${targetHab.cvs}
Nearest Safe Relocation Hub: ${nearestSite.name} (~4.2 km).

Return your response in strict JSON format matching this schema:
{
  "calculatedCvs": 0.88,
  "riskClassification": "TIER 1 — IMMEDIATE RELOCATION",
  "priorityLevel": "CRITICAL",
  "floodExposure": 85,
  "landslideExposure": 94,
  "seismicExposure": 78,
  "terrainRisk": 90,
  "structuralVulnerability": 88,
  "demographicVulnerability": 82,
  "infrastructureVulnerability": 85,
  "aiExecutiveSummary": "High flood exposure combined with unstable terrain and a high proportion of vulnerable structures has resulted in a critical vulnerability score.",
  "keyThreats": [
    "Threat 1 description",
    "Threat 2 description",
    "Threat 3 description"
  ],
  "recommendedActions": [
    "Immediate evacuation assessment",
    "Allocate temporary shelter at nearest Green Safe Hub",
    "Conduct detailed structural inspection",
    "Monitor real-time ground deformation"
  ],
  "dataConfidence": "HIGH (Gemini AI Grounded Telemetry)"
}`;

    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    let attempts = 0;
    const maxAttempts = 3;
    let success = false;
    let parsedResult = null;

    while (attempts < maxAttempts && !success) {
      try {
        attempts++;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        });

        if (response.ok) {
          const result = await response.json();
          const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            parsedResult = JSON.parse(rawText);
            success = true;
          }
        }
      } catch (err) {
        console.warn(`Gemini API Call Attempt ${attempts} failed:`, err);
        if (attempts < maxAttempts) {
          await new Promise((res) => setTimeout(res, Math.pow(2, attempts) * 1000));
        }
      }
    }

    if (success && parsedResult) {
      setAiInspectResult({
        ...parsedResult,
        habitation: targetHab,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLiveAi: true
      });

      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: loggedInUser?.name || 'Officer Alex Mercer',
        action: `Executed Live Gemini 3 Flash AI Vulnerability Assessment for ${targetHab.name}. Result: ${parsedResult.riskClassification}`,
        category: 'AI Assessments'
      };
      setAuditLogs((prev) => [newLog, ...prev]);

      setToastMessage({ text: `🧠 Live Gemini AI Analysis Complete for ${targetHab.name}!`, type: 'auth' });
      setTimeout(() => setToastMessage(null), 3500);
    } else {
      // Deterministic calculation engine fallback
      const cvs = targetHab.cvs;
      const tier = cvs >= 0.75 ? 'TIER 1 — IMMEDIATE RELOCATION' : (cvs >= 0.50 ? 'TIER 2 — SHORT-TERM RELOCATION' : 'TIER 3 — MEDIUM-TERM MONITORING');
      const priority = cvs >= 0.75 ? 'CRITICAL' : (cvs >= 0.50 ? 'HIGH' : 'MODERATE');

      const scores = targetHab.scores || {
        flood: Math.round(cvs * 95),
        landslide: Math.round(cvs * 98),
        seismic: Math.round(cvs * 82),
        terrain: Math.round(cvs * 90),
        structural: Math.round(cvs * 88),
        demographic: Math.round(cvs * 80),
        infra: Math.round(cvs * 84)
      };

      setAiInspectResult({
        habitation: targetHab,
        calculatedCvs: cvs,
        riskClassification: tier,
        priorityLevel: priority,
        floodExposure: scores.flood,
        landslideExposure: scores.landslide,
        seismicExposure: scores.seismic,
        terrainRisk: scores.terrain,
        structuralVulnerability: scores.structural,
        demographicVulnerability: scores.demographic,
        infrastructureVulnerability: scores.infra,
        aiExecutiveSummary: `[Prototype / Simulated Engine] High flood and mudflow exposure combined with steep slope geometry and ${targetHab.kuchaHouses} Kucha mud houses has resulted in an elevated vulnerability score. The habitation should be prioritized for immediate evacuation planning.`,
        keyThreats: [
          `Active Slope Shear Stress under ${targetHab.hazard}`,
          `High proportion of vulnerable demographic groups (${targetHab.elderly + targetHab.infants + targetHab.pwd} individuals)`,
          `Limited structural shear resistance in Kucha mud/straw housing units`
        ],
        recommendedActions: [
          "Immediate field NDRF reconnaissance deployment",
          `Allocate evacuation quota at ${nearestSite.name}`,
          "Issue localized level-3 emergency audio siren alerts",
          "Deploy geotechnical deformation sensors along slope crest"
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dataConfidence: 'PROTOTYPE / SIMULATED ENGINE',
        isLiveAi: false
      });

      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: loggedInUser?.name || 'Officer Alex Mercer',
        action: `Calculated Simulated Risk Profile for ${targetHab.name} (CVS: ${cvs}).`,
        category: 'AI Assessments'
      };
      setAuditLogs((prev) => [newLog, ...prev]);

      setToastMessage({ text: `✓ Simulated Assessment Computed for ${targetHab.name}`, type: 'auth' });
      setTimeout(() => setToastMessage(null), 3000);
    }

    setAiInspectLoading(false);
  };

  const handleApplyHazardScenarioToGrid = () => {
    const selectedScenario = HAZARD_SIM_SCENARIOS.find((s) => s.id === selectedScenarioId) || HAZARD_SIM_SCENARIOS[0];

    setHabitations((prev) =>
      prev.map((h) => {
        const newCvs = Math.min(0.99, parseFloat((h.cvs * (1 + simShockValue / 200)).toFixed(2)));
        const isRed = newCvs >= 0.75;
        return {
          ...h,
          cvs: newCvs,
          priority: isRed ? 'CRITICAL' : 'HIGH',
          status: isRed ? 'RED_ALERT' : 'YELLOW_ALERT',
          tier: isRed ? 'Tier 1 (Immediate Evacuation)' : 'Tier 2 (Short-Term Relocation)'
        };
      })
    );

    setCrowdZones((prev) =>
      prev.map((z) => ({
        ...z,
        count: Math.round(z.count * (1 + simShockValue / 150)),
        density: Math.min(99, Math.round(z.density * (1 + simShockValue / 150))),
        level: 'RED',
        trend: `Escalated (+${simShockValue}% Hazard Shock)`
      }))
    );

    const emgId = 'EMG-SIM-' + Math.floor(1000 + Math.random() * 9000);
    const simEmergency = {
      id: emgId,
      dispatchId: emgId,
      category: 'Accident',
      text: `SIMULATION ESCALATION: ${selectedScenario.name} (${simShockValue}% shock) triggered high debris flow risk across Uttarkashi sectors.`,
      language: 'English',
      langFlag: '🇺🇸',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      photo: null,
      location: {
        lat: 30.7380,
        lng: 78.4420,
        address: 'Uttarkashi Disaster Shock Sector 01',
        accuracy: 'GPS Shock Grid',
        city: 'Uttarkashi Command Sector'
      },
      crowdData: {
        densityLevel: 'CRITICAL',
        estimatedCount: 220,
        trend: 'Rapid Hazard Inundation Surge',
        congestionStatus: 'EVACUATION ROUTE BLOCKED',
        hotspots: [{ id: 1, name: 'Core Shock Impact Area', count: 180, latOffset: 0.0001, lngOffset: 0.0001, intensity: 'CRITICAL' }]
      },
      status: 'ACTIVE_DISPATCH',
      assignedOfficer: loggedInUser?.name || 'Officer Alex Mercer',
      resolvedAt: null
    };

    setEmergencyAlerts((prev) => [simEmergency, ...prev]);

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: loggedInUser?.name || 'Officer Alex Mercer',
      action: `APPLIED HAZARD SIMULATION: Triggered ${selectedScenario.name} at +${simShockValue}% shock intensity across Command Grid.`,
      category: 'System Overrides'
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    triggerAudioSirenAndVoiceAlert(`Uttarkashi ${selectedScenario.name}`);

    setToastMessage({ text: `🚨 HAZARD SCENARIO APPLIED TO COMMAND GRID! All Zones Escalated.`, type: 'auth' });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetHazardSimulationGrid = () => {
    setHabitations(INITIAL_HABITATIONS);
    setCrowdZones(INITIAL_CROWD_ZONES);
    setSimShockValue(45);

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: loggedInUser?.name || 'Officer Alex Mercer',
      action: `RESET COMMAND GRID: Restored all habitation vulnerability parameters and crowd zones to baseline nominal levels.`,
      category: 'System Overrides'
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    setToastMessage({ text: `✓ Command Grid Restored to Baseline Nominal Levels.`, type: 'auth' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddCustomAuditNote = (e) => {
    e.preventDefault();
    if (!customAuditNote.trim()) return;

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: loggedInUser?.name || 'Officer Alex Mercer',
      action: customAuditNote.trim(),
      category: customAuditCategory
    };

    setAuditLogs([newLog, ...auditLogs]);
    setCustomAuditNote('');
    setToastMessage({ text: `✓ Administrative Directive Logged in Audit Trail!`, type: 'auth' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportAuditLogs = (format) => {
    let fileContent = '';
    let mimeType = 'text/plain';
    let fileName = `SDMA_Governance_Audit_Trail_${Date.now()}`;

    if (format === 'json') {
      fileContent = JSON.stringify(auditLogs, null, 2);
      mimeType = 'application/json';
      fileName += '.json';
    } else {
      fileContent = 'ID,Timestamp,Officer,Category,Action\n' + auditLogs.map((l) => `"${l.id}","${l.time}","${l.user}","${l.category}","${l.action.replace(/"/g, '""')}"`).join('\n');
      mimeType = 'text/csv';
      fileName += '.csv';
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastMessage({ text: `📥 Official Audit Trail Exported (${format.toUpperCase()})`, type: 'auth' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (role === 'authorized') {
      setModalStep('authorized_login');
      setAuthError('');
      setIsModalOpen(true);
    } else if (role === 'emergency') {
      setIsModalOpen(false);
      setView('emergency_form');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!badgeIdInput.trim() || !pinInput.trim()) {
      setAuthError('Please enter both Badge ID / Username and Access PIN.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      const match = VALID_USERS.find(
        (u) => u.badgeId.toLowerCase() === badgeIdInput.trim().toLowerCase() && u.pin === pinInput.trim()
      );

      if (match) {
        setLoggedInUser(match);
        setIsVerifying(false);
        setIsModalOpen(false);
        setView('authorized_portal');
        setToastMessage({
          text: `✓ Verification Successful! Welcome ${match.name}.`,
          type: 'auth'
        });
        setTimeout(() => setToastMessage(null), 3500);
      } else {
        setIsVerifying(false);
        setAuthError('INVALID CREDENTIALS! Badge ID or Access PIN incorrect.');
      }
    }, 800);
  };

  const handleQuickDemoFill = () => {
    setBadgeIdInput('AUTH-8821');
    setPinInput('7749');
    setAuthError('');
  };

  const handleLogOutClick = () => {
    setShowConfirmSignOutModal(true);
  };

  const confirmLogOut = () => {
    setShowConfirmSignOutModal(false);
    setLoggedInUser(null);
    setBadgeIdInput('');
    setPinInput('');
    setAuthError('');
    setView('home');
    setModalStep('select_role');
    setIsModalOpen(true);
  };

  const updateEmergencyStatus = (alertId, newStatus) => {
    const isResolved = newStatus === 'RESOLVED';
    const resolveTimeObj = isResolved ? {
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    } : null;

    setEmergencyAlerts((prev) =>
      prev.map((item) =>
        item.id === alertId
          ? {
              ...item,
              status: newStatus,
              resolvedAt: isResolved ? resolveTimeObj : item.resolvedAt,
              assignedOfficer: loggedInUser?.name || 'Officer Alex Mercer'
            }
          : item
      )
    );

    if (selectedEmergencyForMap && selectedEmergencyForMap.id === alertId) {
      setSelectedEmergencyForMap((prev) => ({
        ...prev,
        status: newStatus,
        resolvedAt: isResolved ? resolveTimeObj : prev.resolvedAt,
        assignedOfficer: loggedInUser?.name || 'Officer Alex Mercer'
      }));
    }

    setToastMessage({
      text: isResolved 
        ? `✓ Emergency ${alertId} resolved & archived in History Panel!`
        : `✓ Emergency ${alertId} status updated to: ${newStatus}`,
      type: 'auth'
    });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmEvacuationShift = () => {
    const hab = habitations.find((h) => h.id === selectedHabId);
    const site = candidateSites.find((s) => s.id === selectedSiteId);

    if (hab && site) {
      const populationToMove = hab.pop;

      setCandidateSites((prev) =>
        prev.map((s) => (s.id === site.id ? { ...s, allocatedPop: s.allocatedPop + populationToMove } : s))
      );

      setHabitations((prev) =>
        prev.map((h) =>
          h.id === hab.id
            ? {
                ...h,
                pop: 0,
                status: 'EVACUATED',
                tier: 'Tier 3 (Safely Evacuated)',
                cvs: 0.12,
                name: `${h.name.replace(' (Red Hazard Zone)', '')} [EVACUATED TO SAFE ZONE]`
              }
            : h
        )
      );

      setCrowdZones((prev) =>
        prev.map((zone) =>
          zone.level === 'RED'
            ? {
                ...zone,
                count: Math.max(8, zone.count - 45),
                density: Math.max(12, zone.density - 50),
                level: zone.density - 50 < 40 ? 'GREEN' : 'YELLOW',
                trend: 'Crowd Evacuated to Safe Sector'
              }
            : zone
        )
      );

      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: loggedInUser?.name || 'Authorized Officer',
        action: `SUCCESSFUL EVACUATION SHIFT: Transferred ${populationToMove} citizens from ${hab.name} to ${site.name}.`,
        category: 'Relocation Order'
      };

      setAuditLogs((prev) => [newLog, ...prev]);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const confirmationSpeech = new SpeechSynthesisUtterance(
          `Evacuation confirmed! ${populationToMove} citizens safely transferred from hazard zone to ${site.name}.`
        );
        window.speechSynthesis.speak(confirmationSpeech);
      }

      setToastMessage({ text: `✓ EMERGENCY EVACUATION EXECUTED! ${populationToMove} Residents Shifted to ${site.name}`, type: 'auth' });
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleTriggerTacticalSos = (typeText) => {
    const targetZone = crowdZones.find(z => z.id === selectedSosTargetZone) || crowdZones[0];

    const newEvt = {
      id: 'sos-' + Date.now(),
      type: typeText,
      target: targetZone.name,
      time: 'Just now',
      status: 'NDRF Unit Dispatched',
      eta: `${Math.floor(Math.random() * 6 + 2)} Mins`
    };

    setTacticalSosQueue((prev) => [newEvt, ...prev]);

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: loggedInUser?.name || 'Authorized Officer',
      action: `Triggered 1-Tap SOS Alarm: ${typeText} at ${targetZone.name}. Loud audio broadcast initiated.`,
      category: 'Dispatches'
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    triggerAudioSirenAndVoiceAlert(targetZone.name);

    setToastMessage({ text: `🔊 LOUD EMERGENCY SOS BROADCAST SENT TO ${targetZone.name}!`, type: 'auth' });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateCheckIn = (e) => {
    e.preventDefault();
    if (!newEntrantName.trim() || !newEntrantId.trim()) return;

    const newRecord = {
      id: 'ENT-' + Math.floor(1000 + Math.random() * 9000),
      name: newEntrantName.trim(),
      type: newEntrantType,
      idNumber: newEntrantId.trim(),
      zone: newEntrantZone,
      timeIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'ACTIVE'
    };

    setEntryLogs([newRecord, ...entryLogs]);
    setNewEntrantName('');
    setNewEntrantId('');
    setAccessSubTab('entry_log');

    setToastMessage({
      text: `✓ Authorized Entry Granted for ${newRecord.name} (${newRecord.id})`,
      type: 'auth'
    });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCheckOutEntrant = (id) => {
    setEntryLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, status: 'CHECKED_OUT' } : log))
    );
    setToastMessage({
      text: `✓ Entrant ${id} successfully checked out.`,
      type: 'auth'
    });
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleGateStatus = (gateKey) => {
    setGatesStatus((prev) => ({
      ...prev,
      [gateKey]: prev[gateKey] === 'UNLOCKED' ? 'LOCKED' : 'UNLOCKED'
    }));
  };

  const handleGeneratePass = (e) => {
    e.preventDefault();
    if (!passRecipientName.trim()) return;

    const pass = {
      passCode: 'PASS-' + Math.floor(100000 + Math.random() * 900000),
      name: passRecipientName.trim(),
      zone: passZone,
      issuedAt: new Date().toLocaleTimeString(),
      validUntil: 'Today, 23:59 PM',
      issuer: loggedInUser?.name || 'Officer Alex Mercer'
    };

    setGeneratedPass(pass);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = selectedLang;
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          simulateVoiceInput();
        }
      } else {
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    const langObj = LANGUAGES.find((l) => l.code === selectedLang);
    const phrase = langObj ? langObj.quickPhrases[0] : 'Emergency help required at my current location!';
    
    setTimeout(() => {
      setEmergencyText((prev) => (prev ? `${prev} ${phrase}` : phrase));
      setIsListening(false);
    }, 2200);
  };

  const handleKeyPress = (char) => setEmergencyText((prev) => prev + char);
  const handleBackspace = () => setEmergencyText((prev) => prev.slice(0, -1));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setAttachedPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitEmergencyForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedId = 'EMG-' + Math.floor(100000 + Math.random() * 900000);
    setDispatchId(generatedId);

    const langName = LANGUAGES.find((l) => l.code === selectedLang)?.name || 'English';
    const langFlag = LANGUAGES.find((l) => l.code === selectedLang)?.flag || '🇺🇸';

    const newEmergencyRecord = {
      id: generatedId,
      dispatchId: generatedId,
      category: emergencyCategoryInput,
      text: emergencyText || 'Emergency distress signal triggered without text notes.',
      language: langName,
      langFlag: langFlag,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      photo: attachedPhoto,
      location: currentLocation || {
        lat: 28.5355,
        lng: 77.3910,
        address: 'Command Sector Gate 01',
        accuracy: '5.0 meters',
        city: 'Noida Regional Hub'
      },
      status: 'ACTIVE_DISPATCH',
      assignedOfficer: 'Unassigned (Pending Review)',
      resolvedAt: null
    };

    setEmergencyAlerts((prev) => [newEmergencyRecord, ...prev]);

    setTimeout(() => {
      setIsSubmitting(false);
      setView('emergency_success');
    }, 1200);
  };

  const handleRequestGoHome = () => {
    if (view === 'home') {
      goHome();
    } else {
      setShowConfirmHomeModal(true);
    }
  };

  const confirmGoHome = () => {
    setShowConfirmHomeModal(false);
    goHome();
  };

  const goHome = () => {
    setView('home');
    setSelectedRole(null);
    setModalStep('select_role');
    setIsModalOpen(true);
    setEmergencyText('');
    setAttachedPhoto(null);
    setPhotoName('');
  };

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const filteredLogs = entryLogs.filter(
    (log) =>
      log.name.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.idNumber.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.zone.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(logSearchQuery.toLowerCase())
  );

  const activeEmergencies = emergencyAlerts.filter((e) => e.status !== 'RESOLVED');
  const activeEmergenciesCount = activeEmergencies.length;
  const resolvedEmergencies = emergencyAlerts.filter((e) => e.status === 'RESOLVED');

  const filteredHistory = resolvedEmergencies.filter((item) => {
    const matchesCategory = historyCategoryFilter === 'ALL' || item.category === historyCategoryFilter;
    const matchesSearch = 
      item.dispatchId.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      item.text.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      item.location.address.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      (item.assignedOfficer && item.assignedOfficer.toLowerCase().includes(historySearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeIcon = (category) => {
    switch (category) {
      case 'Medical Emergency':
        return <Stethoscope className="w-3.5 h-3.5 text-blue-500" />;
      case 'Fire Help':
        return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'Police Help':
        return <Siren className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Accident':
        return <Car className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  const activeScenario = HAZARD_SIM_SCENARIOS.find((s) => s.id === selectedScenarioId) || HAZARD_SIM_SCENARIOS[0];
  const totalSimPop = habitations.reduce((sum, h) => sum + h.pop, 0);
  const simAffectedPop = Math.round(totalSimPop * (simShockValue / 100));
  const simKuchaDamaged = Math.round(habitations.reduce((sum, h) => sum + h.kuchaHouses, 0) * (simShockValue / 100));
  const simPuccaCompromised = Math.round(habitations.reduce((sum, h) => sum + h.puccaHouses, 0) * (simShockValue / 180));
  const simLandCost = (simAffectedPop * 0.012).toFixed(2);
  const simHousingCost = (simAffectedPop * 0.022).toFixed(2);
  const simReliefCost = (simAffectedPop * 0.008).toFixed(2);
  const simTotalBudget = (parseFloat(simLandCost) + parseFloat(simHousingCost) + parseFloat(simReliefCost)).toFixed(2);
  const simBusesNeeded = Math.ceil(simAffectedPop / 40);

  const selectedHab = habitations.find((h) => h.id === selectedHabId) || habitations[0];
  const selectedSite = candidateSites.find((s) => s.id === selectedSiteId) || candidateSites[0];
  const remainingCap = selectedSite ? selectedSite.maxCapacity - selectedSite.allocatedPop : 0;
  const isAllocationFeasible = selectedHab && selectedHab.pop > 0 && remainingCap >= selectedHab.pop;

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesCat = auditCategoryFilter === 'ALL' || log.category === auditCategoryFilter;
    const matchesSearch = 
      log.action.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      log.time.toLowerCase().includes(auditSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div 
      className="min-h-screen flex flex-col justify-between transition-colors duration-300 font-sans relative overflow-x-hidden"
      style={{ 
        backgroundColor: currentTheme.bgPage, 
        color: currentTheme.textPrimary 
      }}
    >
      <header 
        className="w-full px-4 sm:px-6 py-3.5 flex justify-between items-center border-b backdrop-blur-md sticky top-0 z-30 transition-colors"
        style={{ borderColor: currentTheme.border }}
      >
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleRequestGoHome}>
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm shrink-0"
            style={{ backgroundColor: currentTheme.btnAuth, color: currentTheme.textPrimary }}
          >
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base tracking-tight leading-tight" style={{ color: currentTheme.textPrimary }}>
              Identity & Authorized Entry System
            </h1>
            <p className="text-[11px] sm:text-xs font-medium" style={{ color: currentTheme.textMuted }}>
              Rapid Access Control & GIS Human Radar Engine
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-sm border hover:opacity-90 active:scale-95"
            style={{ 
              backgroundColor: currentTheme.bgCard, 
              borderColor: currentTheme.border,
              color: currentTheme.textPrimary 
            }}
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-amber-200" />}
            <span className="hidden sm:inline">{theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>

          <button
            onClick={handleRequestGoHome}
            className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-sm border hover:opacity-90 active:scale-95"
            style={{ 
              backgroundColor: currentTheme.btnAuth, 
              borderColor: currentTheme.border,
              color: currentTheme.textPrimary
            }}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-center items-center text-center my-auto">
        
        {toastMessage && (
          <div className="fixed top-16 sm:top-20 z-50 px-5 py-2.5 rounded-2xl text-xs font-black shadow-2xl transition-all bg-emerald-600 text-white border border-emerald-400">
            {toastMessage.text}
          </div>
        )}

        {isSirenActive && (
          <div className="fixed top-16 sm:top-20 z-50 w-[92%] max-w-3xl p-3.5 rounded-2xl bg-red-600 text-white shadow-2xl border-2 border-red-300 flex items-center justify-between animate-pulse">
            <div className="flex items-center space-x-3 overflow-hidden text-left">
              <Volume2 className="w-6 h-6 shrink-0 animate-bounce" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider">LOUD EMERGENCY SIREN BROADCAST ACTIVE</p>
                <p className="text-[11px] font-semibold truncate">{activeSirenMessage}</p>
              </div>
            </div>

            <button
              onClick={stopAudioSirenAndVoice}
              className="px-3 py-1.5 rounded-xl bg-white text-red-700 font-extrabold text-xs shadow hover:bg-stone-100 shrink-0 ml-2 flex items-center space-x-1"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>MUTE ALARM</span>
            </button>
          </div>
        )}

        {/* VIEW 1: HOME LANDING */}
        {view === 'home' && (
          <div 
            className="border rounded-3xl p-6 sm:p-10 shadow-xl max-w-lg w-full transition-all"
            style={{ 
              backgroundColor: currentTheme.bgCard, 
              borderColor: currentTheme.border,
              boxShadow: `0 20px 40px ${currentTheme.cardShadow}`
            }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner"
              style={{ backgroundColor: currentTheme.btnAuth }}
            >
              <User className="w-8 h-8" style={{ color: currentTheme.textPrimary }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: currentTheme.textPrimary }}>
              Identity Pending Selection
            </h2>
            <p className="text-xs sm:text-sm mb-6 leading-relaxed" style={{ color: currentTheme.textMuted }}>
              Please select your role to access the Authorized Entry Portal with Badge ID authentication or trigger emergency dispatch protocols.
            </p>
            <button
              onClick={() => {
                setModalStep('select_role');
                setIsModalOpen(true);
              }}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:brightness-95 transition-all active:scale-95 flex items-center justify-center space-x-2"
              style={{ 
                backgroundColor: currentTheme.btnAuth,
                color: currentTheme.textPrimary
              }}
            >
              <span>Open Role Selection Prompt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {view === 'authorized_portal' && (
          <div 
            className="border rounded-3xl p-4 sm:p-8 shadow-xl max-w-5xl w-full transition-all text-left"
            style={{ 
              backgroundColor: currentTheme.bgCard, 
              borderColor: currentTheme.border,
              boxShadow: `0 20px 40px ${currentTheme.cardShadow}`
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 mb-5 border-b gap-3" style={{ borderColor: currentTheme.border }}>
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold text-xl border border-emerald-500/30 shrink-0">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-[10px] sm:text-[11px] font-extrabold rounded-md">
                      AUTHORIZED ENTRY PORTAL
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-300">
                      {loggedInUser?.badgeId || 'AUTH-8821'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-1" style={{ color: currentTheme.textPrimary }}>
                    {loggedInUser?.name || 'Officer Alex Mercer'}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                    {loggedInUser?.role || 'Security Ops Lead'} • {loggedInUser?.clearance || 'Level 4 Command'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <div className="text-right hidden sm:block mr-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: currentTheme.textMuted }}>Clock</p>
                  <p className="text-xs font-mono font-bold" style={{ color: currentTheme.textPrimary }}>{sessionTime}</p>
                </div>
                <button
                  onClick={handleLogOutClick}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center space-x-2 transition-all hover:bg-red-500/10 hover:text-red-600"
                  style={{ borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="flex overflow-x-auto gap-2 mb-6 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border scrollbar-none" style={{ borderColor: currentTheme.border }}>
              <button
                onClick={() => setActivePortalTab('access_ops')}
                className={`py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 whitespace-nowrap ${
                  activePortalTab === 'access_ops' ? 'shadow-md border' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ 
                  backgroundColor: activePortalTab === 'access_ops' ? currentTheme.btnAuth : 'transparent',
                  borderColor: activePortalTab === 'access_ops' ? currentTheme.border : 'transparent',
                  color: currentTheme.textPrimary 
                }}
              >
                <ClipboardList className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                <span>Access & Gate Operations</span>
              </button>

              <button
                onClick={() => setActivePortalTab('emergency_alerts')}
                className={`py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-black flex items-center space-x-2 transition-all shrink-0 whitespace-nowrap relative ${
                  activeEmergenciesCount > 0
                    ? activePortalTab === 'emergency_alerts'
                      ? 'bg-red-600 text-white shadow-lg border-red-500' 
                      : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                    : activePortalTab === 'emergency_alerts' 
                      ? 'shadow-md border' 
                      : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: activeEmergenciesCount === 0 && activePortalTab === 'emergency_alerts' ? currentTheme.btnAuth : undefined,
                  borderColor: activeEmergenciesCount === 0 && activePortalTab === 'emergency_alerts' ? currentTheme.border : undefined,
                  color: activeEmergenciesCount === 0 ? currentTheme.textPrimary : undefined
                }}
              >
                {activeEmergenciesCount > 0 ? (
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )}
                <span>Google Maps Emergencies ({activeEmergenciesCount})</span>
              </button>

              <button
                onClick={() => setActivePortalTab('history')}
                className={`py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 whitespace-nowrap ${
                  activePortalTab === 'history' ? 'shadow-md border' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ 
                  backgroundColor: activePortalTab === 'history' ? currentTheme.btnAuth : 'transparent',
                  borderColor: activePortalTab === 'history' ? currentTheme.border : 'transparent',
                  color: currentTheme.textPrimary 
                }}
              >
                <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>History Archive ({resolvedEmergencies.length})</span>
              </button>

              <button
                onClick={() => setActivePortalTab('system_analytics')}
                className={`py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 whitespace-nowrap ${
                  activePortalTab === 'system_analytics' ? 'shadow-md border' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ 
                  backgroundColor: activePortalTab === 'system_analytics' ? currentTheme.btnAuth : 'transparent',
                  borderColor: activePortalTab === 'system_analytics' ? currentTheme.border : 'transparent',
                  color: currentTheme.textPrimary 
                }}
              >
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>System Analytics</span>
              </button>
            </div>

            {/* TAB CONTENT 1: ACCESS & GATE OPERATIONS */}
            {activePortalTab === 'access_ops' && (
              <div className="space-y-5">
                <div className="flex overflow-x-auto gap-2 p-1 rounded-xl bg-black/5 dark:bg-white/5 border scrollbar-none" style={{ borderColor: currentTheme.border }}>
                  <button
                    onClick={() => setAccessSubTab('entry_log')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shrink-0 whitespace-nowrap ${
                      accessSubTab === 'entry_log' ? 'shadow border' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: accessSubTab === 'entry_log' ? currentTheme.btnAuth : 'transparent',
                      borderColor: accessSubTab === 'entry_log' ? currentTheme.border : 'transparent',
                      color: currentTheme.textPrimary
                    }}
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    <span>Live Entry Log ({entryLogs.filter(l => l.status === 'ACTIVE').length})</span>
                  </button>

                  <button
                    onClick={() => setAccessSubTab('new_checkin')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shrink-0 whitespace-nowrap ${
                      accessSubTab === 'new_checkin' ? 'shadow border' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: accessSubTab === 'new_checkin' ? currentTheme.btnAuth : 'transparent',
                      borderColor: accessSubTab === 'new_checkin' ? currentTheme.border : 'transparent',
                      color: currentTheme.textPrimary
                    }}
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>New Check-In</span>
                  </button>

                  <button
                    onClick={() => setAccessSubTab('gate_control')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shrink-0 whitespace-nowrap ${
                      accessSubTab === 'gate_control' ? 'shadow border' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: accessSubTab === 'gate_control' ? currentTheme.btnAuth : 'transparent',
                      borderColor: accessSubTab === 'gate_control' ? currentTheme.border : 'transparent',
                      color: currentTheme.textPrimary
                    }}
                  >
                    <DoorOpen className="w-3.5 h-3.5" />
                    <span>Gates Control</span>
                  </button>

                  <button
                    onClick={() => setAccessSubTab('pass_generator')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shrink-0 whitespace-nowrap ${
                      accessSubTab === 'pass_generator' ? 'shadow border' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: accessSubTab === 'pass_generator' ? currentTheme.btnAuth : 'transparent',
                      borderColor: accessSubTab === 'pass_generator' ? currentTheme.border : 'transparent',
                      color: currentTheme.textPrimary
                    }}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Digital Pass</span>
                  </button>
                </div>

                {accessSubTab === 'entry_log' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: currentTheme.textMuted }} />
                        <input
                          type="text"
                          placeholder="Search entrants by Name, ID, or Access Zone..."
                          value={logSearchQuery}
                          onChange={(e) => setLogSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-semibold outline-none"
                          style={{ 
                            backgroundColor: currentTheme.inputBg, 
                            borderColor: currentTheme.border,
                            color: currentTheme.textPrimary 
                          }}
                        />
                      </div>
                    </div>

                    <div className="border rounded-2xl overflow-hidden" style={{ borderColor: currentTheme.border }}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b bg-black/5 dark:bg-white/5 font-extrabold uppercase tracking-wider" style={{ borderColor: currentTheme.border, color: currentTheme.textMuted }}>
                              <th className="p-3.5 whitespace-nowrap">Log ID</th>
                              <th className="p-3.5 whitespace-nowrap">Entrant Name</th>
                              <th className="p-3.5 whitespace-nowrap">Category</th>
                              <th className="p-3.5 whitespace-nowrap">ID / License #</th>
                              <th className="p-3.5 whitespace-nowrap">Assigned Zone</th>
                              <th className="p-3.5 whitespace-nowrap">Time In</th>
                              <th className="p-3.5 whitespace-nowrap">Status</th>
                              <th className="p-3.5 text-right whitespace-nowrap">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y" style={{ borderColor: currentTheme.border }}>
                            {filteredLogs.map((log) => (
                              <tr key={log.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="p-3.5 font-mono font-bold whitespace-nowrap">{log.id}</td>
                                <td className="p-3.5 font-extrabold whitespace-nowrap">{log.name}</td>
                                <td className="p-3.5 whitespace-nowrap"><span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-bold text-[10px]">{log.type}</span></td>
                                <td className="p-3.5 font-mono whitespace-nowrap">{log.idNumber}</td>
                                <td className="p-3.5 font-semibold whitespace-nowrap">{log.zone}</td>
                                <td className="p-3.5 font-mono whitespace-nowrap">{log.timeIn}</td>
                                <td className="p-3.5 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                    log.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-stone-500/20 text-stone-600 dark:text-stone-300'
                                  }`}>
                                    {log.status}
                                  </span>
                                </td>
                                <td className="p-3.5 text-right whitespace-nowrap">
                                  {log.status === 'ACTIVE' ? (
                                    <button onClick={() => handleCheckOutEntrant(log.id)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold border bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all" style={{ borderColor: currentTheme.border }}>Check Out</button>
                                  ) : <span className="text-[11px] font-bold" style={{ color: currentTheme.textMuted }}>Completed</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: GOOGLE MAPS EMERGENCIES */}
            {activePortalTab === 'emergency_alerts' && (
              <div className="space-y-6">
                <div className={`p-4 rounded-2xl border flex justify-between items-center transition-colors ${
                  activeEmergenciesCount > 0 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl text-white ${
                      activeEmergenciesCount > 0 ? 'bg-red-600 animate-pulse' : 'bg-emerald-600'
                    }`}>
                      {activeEmergenciesCount > 0 ? <Map className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className={`text-sm font-black ${
                        activeEmergenciesCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {activeEmergenciesCount > 0 
                          ? 'Active Google Maps Emergency Dispatches'
                          : 'Emergency Command Center — All Active Issues Resolved'
                        }
                      </h3>
                      <p className="text-xs" style={{ color: currentTheme.textMuted }}>
                        Click any emergency dispatch card to open interactive Google Maps with live crowd gathering analytics.
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-black rounded-full uppercase tracking-wider shrink-0 ml-2 ${
                    activeEmergenciesCount > 0 ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {activeEmergenciesCount > 0 ? `${activeEmergenciesCount} Active` : 'All Clear ✓'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeEmergencies.map((emg) => (
                    <div 
                      key={emg.id}
                      onClick={() => setSelectedEmergencyForMap(emg)}
                      className="p-5 rounded-2xl border transition-all cursor-pointer relative hover:shadow-lg group border-red-500/60 bg-red-500/5"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-xs font-mono font-black text-red-600 dark:text-red-400">{emg.dispatchId}</span>
                          <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-bold">
                            {emg.langFlag} {emg.language}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200 text-[10px] font-extrabold flex items-center space-x-1">
                            {getCategoryBadgeIcon(emg.category)}
                            <span>{emg.category || 'General'}</span>
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-600 text-white animate-pulse shrink-0">
                          {emg.status.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-xs font-bold my-2 line-clamp-2" style={{ color: currentTheme.textPrimary }}>
                        "{emg.text}"
                      </p>

                      <div className="flex items-center space-x-2 text-[11px] mb-3" style={{ color: currentTheme.textMuted }}>
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{emg.location.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: HISTORY ARCHIVE */}
            {activePortalTab === 'history' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: currentTheme.textMuted }} />
                    <input
                      type="text"
                      placeholder="Search resolved history by Dispatch ID, location, description, or officer..."
                      value={historySearchQuery}
                      onChange={(e) => setHistorySearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-semibold outline-none"
                      style={{ 
                        backgroundColor: currentTheme.inputBg, 
                        borderColor: currentTheme.border,
                        color: currentTheme.textPrimary 
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredHistory.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedEmergencyForMap(item)}
                      className="p-5 rounded-2xl border transition-all cursor-pointer relative hover:shadow-lg group bg-emerald-500/5 border-emerald-500/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">{item.dispatchId}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-600 text-white shrink-0">
                          ✓ RESOLVED
                        </span>
                      </div>

                      <p className="text-xs font-bold my-2 line-clamp-2" style={{ color: currentTheme.textPrimary }}>
                        "{item.text}"
                      </p>

                      <div className="flex items-center space-x-2 text-[11px] mb-2" style={{ color: currentTheme.textMuted }}>
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.location.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: SYSTEM ANALYTICS */}
            {activePortalTab === 'system_analytics' && (
              <div className="space-y-6">
                <div className="flex overflow-x-auto gap-1.5 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border scrollbar-none" style={{ borderColor: currentTheme.border }}>
                  {[
                    { id: 'gis_map', name: 'GIS Human Radar', icon: Compass },
                    { id: 'ai_inspector', name: 'Gemini AI Inspector 🧠', icon: Brain },
                    { id: 'capacity_workbench', name: 'Capacity Matcher', icon: Building },
                    { id: 'sos_dispatch', name: 'Tactical SOS Console', icon: Truck },
                    { id: 'what_if_simulator', name: 'Hazard Simulator', icon: Sliders },
                    { id: 'audit_export', name: 'Governance & Blueprint', icon: FileCheck }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = analyticsSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setAnalyticsSubTab(tab.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shrink-0 whitespace-nowrap ${
                          isActive ? 'shadow-md border' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: isActive ? currentTheme.btnAuth : 'transparent',
                          borderColor: isActive ? currentTheme.border : 'transparent',
                          color: currentTheme.textPrimary
                        }}
                      >
                        <TabIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* SUB-PANEL 1: GIS SATELLITE RADAR */}
                {analyticsSubTab === 'gis_map' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl border bg-black/5 dark:bg-white/5 flex flex-wrap justify-between items-center gap-3" style={{ borderColor: currentTheme.border }}>
                      <div>
                        <h3 className="text-xs sm:text-sm font-black flex items-center space-x-2" style={{ color: currentTheme.textPrimary }}>
                          <Compass className="w-4 h-4 text-amber-500" />
                          <span>Interactive GIS Human Crowd Satellite Radar</span>
                        </h3>
                        <p className="text-[11px] sm:text-xs" style={{ color: currentTheme.textMuted }}>
                          Click any habitation pin or red zone to open the Gemini AI Risk Inspector.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {['satellite', 'dark', 'topo'].map((style) => (
                          <button
                            key={style}
                            onClick={() => setGisTileStyle(style)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                              gisTileStyle === style ? 'bg-amber-500 text-stone-900 shadow' : 'hover:opacity-100 opacity-70'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative h-80 sm:h-96 rounded-2xl border overflow-hidden bg-stone-900 shadow-xl" style={{ borderColor: currentTheme.border }}>
                      <div ref={analyticsMapRef} className="absolute inset-0 z-0"></div>
                    </div>
                  </div>
                )}

                {analyticsSubTab === 'ai_inspector' && (
                  <div className="space-y-5">
                    <div className="p-5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-4" style={{ borderColor: currentTheme.border }}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-3" style={{ borderColor: currentTheme.border }}>
                        <div>
                          <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-purple-600 dark:text-purple-300 flex items-center space-x-2">
                            <Brain className="w-5 h-5 text-purple-500 animate-pulse" />
                            <span>Gemini AI Structural & Disaster-Risk Inspector</span>
                          </h3>
                          <p className="text-xs" style={{ color: currentTheme.textMuted }}>
                            Select any habitation, village, or map coordinates to run grounded AI disaster risk evaluations.
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          <span>gemini-3-flash-preview API</span>
                        </span>
                      </div>

                      {/* Habitation Selector Grid */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTheme.textMuted }}>
                          Select Target Habitation / Village Location
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {habitations.map((hab) => {
                            const isSelected = hab.id === selectedHabId;
                            return (
                              <button
                                key={hab.id}
                                onClick={() => {
                                  setSelectedHabId(hab.id);
                                  callGeminiAiInspection(hab);
                                }}
                                className={`p-3 rounded-2xl text-left border transition-all relative ${
                                  isSelected 
                                    ? 'bg-purple-600 text-white border-purple-400 shadow-lg scale-[1.02]' 
                                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10'
                                }`}
                                style={{ borderColor: isSelected ? undefined : currentTheme.border }}
                              >
                                <span className={`text-[10px] font-black uppercase block ${isSelected ? 'text-purple-200' : 'text-amber-600'}`}>
                                  {hab.district}
                                </span>
                                <h4 className="text-xs font-extrabold truncate my-0.5">{hab.name}</h4>
                                <div className="text-[10px] flex justify-between font-mono opacity-90">
                                  <span>Pop: {hab.pop}</span>
                                  <span>CVS: {hab.cvs}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Trigger Button */}
                      <button
                        onClick={() => callGeminiAiInspection()}
                        disabled={aiInspectLoading}
                        className="w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 text-white bg-purple-600 hover:bg-purple-700 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        {aiInspectLoading ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Calling Gemini 3 Flash API & Grounding Vulnerability Telemetry...</span>
                          </>
                        ) : (
                          <>
                            <Brain className="w-5 h-5" />
                            <span>RUN GEMINI AI DISASTER-RISK INSPECTION ({selectedHab.name})</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI Assessment Structured Output Panel */}
                    {aiInspectResult && (
                      <div className="p-5 sm:p-7 rounded-3xl border bg-black/10 dark:bg-black/30 space-y-6 shadow-2xl animate-fadeIn" style={{ borderColor: currentTheme.border }}>
                        
                        {/* Title Header & Export Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-3" style={{ borderColor: currentTheme.border }}>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400 uppercase">
                                OFFICIAL SDMA INSPECTION DIRECTIVE
                              </span>
                              <span className="px-2 py-0.5 rounded bg-black/20 text-[10px] font-bold font-mono">
                                {aiInspectResult.timestamp}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black mt-1" style={{ color: currentTheme.textPrimary }}>
                              {aiInspectResult.habitation?.name || selectedHab.name}
                            </h3>
                            <p className="text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                              District: {selectedHab.district}, {selectedHab.state} • Coordinates: {selectedHab.lat}° N, {selectedHab.lng}° E
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 self-start sm:self-center">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                              {aiInspectResult.dataConfidence || 'Gemini 3 Grounded Telemetry'}
                            </span>
                            <button
                              onClick={() => window.print()}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow hover:bg-purple-700 transition-all flex items-center space-x-1"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Export Report</span>
                            </button>
                          </div>
                        </div>

                        {/* Demographics Card */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                            <span className="text-[10px] block text-stone-500">Total Citizens</span>
                            <strong className="text-sm" style={{ color: currentTheme.textPrimary }}>{selectedHab.pop} ({selectedHab.families} Families)</strong>
                          </div>
                          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                            <span className="text-[10px] block text-stone-500">Kucha Mud Houses</span>
                            <strong className="text-sm text-amber-600 dark:text-amber-400">{selectedHab.kuchaHouses} Units (High Shear Risk)</strong>
                          </div>
                          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                            <span className="text-[10px] block text-stone-500">Pucca Masonry Houses</span>
                            <strong className="text-sm text-stone-700 dark:text-stone-300">{selectedHab.puccaHouses} Units</strong>
                          </div>
                          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                            <span className="text-[10px] block text-stone-500">Vulnerable Groups</span>
                            <strong className="text-sm text-red-600 dark:text-red-400">{selectedHab.elderly} Senior • {selectedHab.pwd} PwD</strong>
                          </div>
                        </div>

                        {/* Individual Multi-Factor Risk Score Gauges (0-100) */}
                        <div className="p-4 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-3" style={{ borderColor: currentTheme.border }}>
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-300">
                            Multi-Factor Risk Analysis Profile (0–100 Scale)
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                              <span className="text-[10px] text-stone-500 block">Flood Exposure</span>
                              <strong className="text-sm text-blue-600">{aiInspectResult.floodExposure || 85}/100</strong>
                            </div>
                            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                              <span className="text-[10px] text-stone-500 block">Landslide Scour</span>
                              <strong className="text-sm text-amber-600">{aiInspectResult.landslideExposure || 94}/100</strong>
                            </div>
                            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                              <span className="text-[10px] text-stone-500 block">Seismic Shock</span>
                              <strong className="text-sm text-purple-600">{aiInspectResult.seismicExposure || 78}/100</strong>
                            </div>
                            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border" style={{ borderColor: currentTheme.border }}>
                              <span className="text-[10px] text-stone-500 block">Terrain / Slope Shear</span>
                              <strong className="text-sm text-red-600">{aiInspectResult.terrainRisk || 90}/100</strong>
                            </div>
                          </div>
                        </div>

                        {/* Weighted CVS Formula Breakdown */}
                        <div className="p-4 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-3" style={{ borderColor: currentTheme.border }}>
                          <div className="flex justify-between items-center text-xs font-bold flex-wrap gap-1">
                            <span className="text-purple-600 dark:text-purple-300 uppercase tracking-wider">Weighted Composite Vulnerability Score (CVS) Breakdown</span>
                            <span className="font-mono text-[11px] text-stone-500">CVS = (0.40 × Hazard) + (0.35 × Structural) + (0.25 × Demographic)</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                              <span className="text-[10px] block font-bold text-red-600">Hazard Exposure (40%)</span>
                              <strong className="text-lg text-red-600">{aiInspectResult.hazardExposureScore || aiInspectResult.landslideExposure || 90} / 100</strong>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                              <span className="text-[10px] block font-bold text-amber-700 dark:text-amber-300">Structural Fragility (35%)</span>
                              <strong className="text-lg text-amber-600">{aiInspectResult.structuralRiskScore || aiInspectResult.structuralVulnerability || 88} / 100</strong>
                            </div>
                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                              <span className="text-[10px] block font-bold text-purple-700 dark:text-purple-300">Demographic Vulnerability (25%)</span>
                              <strong className="text-lg text-purple-600">{aiInspectResult.demographicVulnerabilityScore || aiInspectResult.demographicVulnerability || 82} / 100</strong>
                            </div>
                          </div>
                        </div>

                        {/* Decision & Action Recommendation Card */}
                        <div className="p-5 rounded-2xl border-2 border-red-500/60 bg-red-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-black uppercase">
                              CLASSIFICATION DECISION
                            </span>
                            <h4 className="text-lg font-black text-red-600 dark:text-red-400 mt-1">
                              {aiInspectResult.riskClassification || 'TIER 1 — IMMEDIATE RELOCATION'}
                            </h4>
                            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-0.5">
                              Action Priority: <b className="text-red-600">{aiInspectResult.priorityLevel || 'CRITICAL'}</b> • Normalized CVS: <b className="font-mono">{aiInspectResult.calculatedCvs || selectedHab.cvs}</b>
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setActivePortalTab('system_analytics');
                              setAnalyticsSubTab('capacity_workbench');
                            }}
                            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-lg transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
                          >
                            <Building className="w-4 h-4" />
                            <span>Shift Location in Capacity Matcher →</span>
                          </button>
                        </div>

                        {/* AI Executive Explanation Paragraph */}
                        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1.5">
                          <h4 className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 flex items-center space-x-1.5">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span>Gemini AI Structural & Geotechnical Reasoning</span>
                          </h4>
                          <p className="text-xs leading-relaxed font-medium" style={{ color: currentTheme.textPrimary }}>
                            "{aiInspectResult.aiExecutiveSummary}"
                          </p>
                        </div>

                        {/* Itemized Recommendations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border space-y-2" style={{ borderColor: currentTheme.border }}>
                            <h4 className="font-extrabold uppercase text-amber-600 dark:text-amber-400 flex items-center space-x-1.5">
                              <ShieldAlert className="w-4 h-4" />
                              <span>Key Immediate Threats</span>
                            </h4>
                            <ul className="space-y-1.5 pl-2">
                              {(aiInspectResult.keyThreats || [
                                `Active Slope Shear Stress under ${selectedHab.hazard}`,
                                `Vulnerable demographics count (${selectedHab.elderly + selectedHab.infants} citizens)`,
                                `Kucha mud masonry housing deformation`
                              ]).map((t, idx) => (
                                <li key={idx} className="flex items-start space-x-1.5 font-medium">
                                  <span className="text-red-500 font-bold">•</span>
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border space-y-2" style={{ borderColor: currentTheme.border }}>
                            <h4 className="font-extrabold uppercase text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Recommended Action Plan</span>
                            </h4>
                            <ul className="space-y-1.5 pl-2">
                              {(aiInspectResult.recommendedActions || [
                                "Immediate evacuation assessment and site allocation",
                                "Match habitation with nearest Green Safe Zone",
                                "Deploy NDRF ground reconnaissance team",
                                "Monitor deformation sensors along slope crest"
                              ]).map((act, idx) => (
                                <li key={idx} className="flex items-start space-x-1.5 font-semibold">
                                  <span className="text-emerald-500 font-bold">✓</span>
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                )}

                {/* SUB-PANEL 3: CAPACITY MATCHER WORKBENCH */}
                {analyticsSubTab === 'capacity_workbench' && (
                  <div className="space-y-5">
                    <div className="p-4 sm:p-5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-4" style={{ borderColor: currentTheme.border }}>
                      <div className="flex justify-between items-start flex-wrap gap-2 border-b pb-3" style={{ borderColor: currentTheme.border }}>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center space-x-2">
                            <Building className="w-4 h-4" />
                            <span>Dynamic Hazard Evacuation & Safe Zone Matcher Engine</span>
                          </h3>
                          <p className="text-[11px] sm:text-xs" style={{ color: currentTheme.textMuted }}>
                            Select vulnerable population sectors in high-hazard Red zones and shift them to designated Green Safe Fields.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl border bg-red-500/10 border-red-500/30 space-y-2">
                          <label className="block text-xs font-extrabold text-red-600 dark:text-red-400 flex items-center space-x-1.5">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span>Select Danger / Red Zone Habitation (Source)</span>
                          </label>
                          <select
                            value={selectedHabId}
                            onChange={(e) => setSelectedHabId(e.target.value)}
                            className="w-full p-3 rounded-xl border text-xs font-bold outline-none cursor-pointer bg-white dark:bg-stone-900"
                            style={{ borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                          >
                            {habitations.map((h) => (
                              <option key={h.id} value={h.id}>
                                {h.name} — {h.pop} Citizens ({h.tier})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-2">
                          <label className="block text-xs font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Select Safe / Green Candidate Site (Destination)</span>
                          </label>
                          <select
                            value={selectedSiteId}
                            onChange={(e) => setSelectedSiteId(e.target.value)}
                            className="w-full p-3 rounded-xl border text-xs font-bold outline-none cursor-pointer bg-white dark:bg-stone-900"
                            style={{ borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                          >
                            {candidateSites.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name} — Rem. Capacity: {s.maxCapacity - s.allocatedPop}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleConfirmEvacuationShift}
                        disabled={!isAllocationFeasible}
                        className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2 text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                        <span>EXECUTE EMERGENCY EVACUATION & SHIFT TO SAFE ZONE</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* SUB-PANEL 4: TACTICAL SOS CONSOLE */}
                {analyticsSubTab === 'sos_dispatch' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl border bg-black/5 dark:bg-white/5 text-center space-y-4 flex flex-col justify-between" style={{ borderColor: currentTheme.border }}>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center justify-center space-x-1.5">
                            <Siren className="w-4 h-4" />
                            <span>1-Tap Red Zone SOS & Audio Alarm</span>
                          </h4>
                          <p className="text-[11px] mt-1" style={{ color: currentTheme.textMuted }}>
                            Tapping broadcasts a swept Web Audio emergency siren and high-volume voice dispatch alert.
                          </p>
                        </div>

                        <button
                          onClick={() => handleTriggerTacticalSos('Critical Emergency Medical Evacuation')}
                          className="w-32 h-32 mx-auto rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-2xl border-4 border-red-300 flex flex-col items-center justify-center transition-transform active:scale-90 animate-pulse my-2 cursor-pointer"
                        >
                          <Zap className="w-7 h-7 mb-1" />
                          <span>1-TAP SOS</span>
                          <span className="text-[9px] font-mono opacity-90">LOUD VOICE</span>
                        </button>
                      </div>

                      <div className="lg:col-span-2 p-5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-3" style={{ borderColor: currentTheme.border }}>
                        <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: currentTheme.border }}>
                          <h4 className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center space-x-1.5">
                            <Activity className="w-4 h-4" />
                            <span>Live First-Responder & NDRF Dispatch Queue</span>
                          </h4>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {tacticalSosQueue.map((evt) => (
                            <div key={evt.id} className="p-3 rounded-xl border bg-black/5 dark:bg-white/5 text-xs flex justify-between items-center gap-2" style={{ borderColor: currentTheme.border }}>
                              <div>
                                <span className="font-extrabold block" style={{ color: currentTheme.textPrimary }}>{evt.type}</span>
                                <span className="text-[11px] font-medium text-amber-600 dark:text-amber-300 block">Target: {evt.target}</span>
                              </div>
                              <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 text-[10px] font-black shrink-0">
                                {evt.status} (ETA: {evt.eta})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {analyticsSubTab === 'what_if_simulator' && (
                  <div className="p-5 sm:p-7 rounded-3xl border bg-black/5 dark:bg-white/5 space-y-6" style={{ borderColor: currentTheme.border }}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4" style={{ borderColor: currentTheme.border }}>
                      <div>
                        <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center space-x-2">
                          <Sliders className="w-5 h-5 text-amber-500" />
                          <span>Parametric "What-If" Hazard Simulator & Command Stress Test</span>
                        </h3>
                        <p className="text-xs" style={{ color: currentTheme.textMuted }}>
                          Simulate extreme climate or seismic events to calculate structural damage and emergency budget requirements.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                          Live Parametric Engine
                        </span>
                        <button
                          onClick={handleResetHazardSimulationGrid}
                          className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-300 flex items-center space-x-1"
                          title="Reset simulation parameters to baseline"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Grid</span>
                        </button>
                      </div>
                    </div>

                    {/* Scenario Selectors */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTheme.textMuted }}>
                        Select Disaster Hazard Scenario
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {HAZARD_SIM_SCENARIOS.map((scen) => {
                          const ScenIcon = scen.icon;
                          const isSelected = scen.id === selectedScenarioId;
                          return (
                            <button
                              key={scen.id}
                              onClick={() => {
                                setSelectedScenarioId(scen.id);
                                setSimShockValue(scen.riskEscalation);
                              }}
                              className={`p-3.5 rounded-2xl text-left border transition-all ${
                                isSelected 
                                  ? 'bg-amber-500 text-stone-900 border-amber-400 shadow-lg scale-[1.02] font-black' 
                                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10'
                              }`}
                              style={{ borderColor: isSelected ? undefined : currentTheme.border }}
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                <ScenIcon className="w-4 h-4" />
                                <span className="text-xs font-extrabold">{scen.name}</span>
                              </div>
                              <p className="text-[10px] opacity-80 leading-tight">{scen.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Shock Intensity Slider */}
                    <div className="p-4 rounded-2xl border bg-black/10 dark:bg-black/30 space-y-3" style={{ borderColor: currentTheme.border }}>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span style={{ color: currentTheme.textMuted }}>Simulated Risk Escalation Shock Slider</span>
                        <span className="text-red-600 dark:text-red-400 font-mono text-sm font-black">
                          +{simShockValue}% Hazard Escalation
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={simShockValue}
                        onChange={(e) => setSimShockValue(parseInt(e.target.value))}
                        className="w-full h-2.5 rounded-lg cursor-pointer accent-amber-500 bg-stone-300 dark:bg-stone-700"
                      />
                    </div>

                    {/* Calculated Live Damage Matrix */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="p-3.5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-1" style={{ borderColor: currentTheme.border }}>
                        <span className="text-[10px] block text-stone-500">Affected Citizens</span>
                        <strong className="text-lg text-red-600 dark:text-red-400">{simAffectedPop} / {totalSimPop}</strong>
                      </div>
                      <div className="p-3.5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-1" style={{ borderColor: currentTheme.border }}>
                        <span className="text-[10px] block text-stone-500">Damaged Kucha Mud Houses</span>
                        <strong className="text-lg text-amber-600 dark:text-amber-400">{simKuchaDamaged} Units</strong>
                      </div>
                      <div className="p-3.5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-1" style={{ borderColor: currentTheme.border }}>
                        <span className="text-[10px] block text-stone-500">Compromised Pucca Houses</span>
                        <strong className="text-lg text-stone-700 dark:text-stone-300">{simPuccaCompromised} Units</strong>
                      </div>
                      <div className="p-3.5 rounded-2xl border bg-black/5 dark:bg-white/5 space-y-1" style={{ borderColor: currentTheme.border }}>
                        <span className="text-[10px] block text-stone-500">Required Bus Convoy</span>
                        <strong className="text-lg text-emerald-600 dark:text-emerald-400">{simBusesNeeded} Buses</strong>
                      </div>
                    </div>

                    {/* Total Budget Requirements Box */}
                    <div className="p-4 rounded-2xl border bg-black/5 dark:bg-white/5 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: currentTheme.border }}>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Estimated Total Disaster Relief Budget Needed</span>
                        <div className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                          ₹ {simTotalBudget} Crores <span className="text-xs text-stone-500 font-normal">(Land: ₹{simLandCost}Cr • Housing: ₹{simHousingCost}Cr • Supplies: ₹{simReliefCost}Cr)</span>
                        </div>
                      </div>

                      <button
                        onClick={handleApplyHazardScenarioToGrid}
                        className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-xl transition-all active:scale-95 flex items-center space-x-2 shrink-0 cursor-pointer"
                      >
                        <Zap className="w-4 h-4 animate-bounce" />
                        <span>APPLY SCENARIO TO COMMAND GRID</span>
                      </button>
                    </div>
                  </div>
                )}

                {analyticsSubTab === 'audit_export' && (
                  <div className="space-y-6">
                    <div className="p-5 sm:p-7 rounded-3xl border bg-black/5 dark:bg-white/5 space-y-6" style={{ borderColor: currentTheme.border }}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4" style={{ borderColor: currentTheme.border }}>
                        <div>
                          <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center space-x-2">
                            <FileCheck className="w-5 h-5 text-amber-500" />
                            <span>Governance, Human-In-The-Loop Audit & Relocation Directive</span>
                          </h3>
                          <p className="text-xs" style={{ color: currentTheme.textMuted }}>
                            Official administrative audit trail recording all officer commands, AI assessments, and emergency dispatches.
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleExportAuditLogs('csv')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1"
                            style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>Export CSV</span>
                          </button>
                          <button
                            onClick={() => handleExportAuditLogs('json')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1"
                            style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Export JSON</span>
                          </button>
                          <button
                            onClick={() => setIsBlueprintModalOpen(true)}
                            className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-stone-900 shadow transition-all hover:bg-amber-400 cursor-pointer"
                          >
                            Print Official Order Blueprint 📄
                          </button>
                        </div>
                      </div>

                      {/* Manual Directive Entry Form */}
                      <form onSubmit={handleAddCustomAuditNote} className="p-4 rounded-2xl border bg-black/10 dark:bg-black/30 space-y-3" style={{ borderColor: currentTheme.border }}>
                        <h4 className="text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400 flex items-center space-x-1.5">
                          <Plus className="w-4 h-4" />
                          <span>Dispatch Officer Administrative Directive / Note</span>
                        </h4>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <select
                            value={customAuditCategory}
                            onChange={(e) => setCustomAuditCategory(e.target.value)}
                            className="p-2.5 rounded-xl border text-xs font-bold outline-none cursor-pointer bg-white dark:bg-stone-900"
                            style={{ borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                          >
                            <option value="System Overrides">System Overrides</option>
                            <option value="Relocation Order">Relocation Order</option>
                            <option value="Dispatches">Dispatches</option>
                            <option value="AI Assessments">AI Assessments</option>
                          </select>

                          <input
                            type="text"
                            required
                            placeholder="Type official directive (e.g. Dispatched 5 additional medical buses to Gate 02)..."
                            value={customAuditNote}
                            onChange={(e) => setCustomAuditNote(e.target.value)}
                            className="flex-1 p-2.5 rounded-xl border text-xs font-medium outline-none"
                            style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                          />

                          <button
                            type="submit"
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow flex items-center justify-center space-x-1 shrink-0 cursor-pointer"
                          >
                            <span>LOG DIRECTIVE</span>
                          </button>
                        </div>
                      </form>

                      {/* Audit Log Controls & List */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
                          <div className="relative flex-1">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: currentTheme.textMuted }} />
                            <input
                              type="text"
                              placeholder="Filter logs by officer, timestamp, or directive text..."
                              value={auditSearchQuery}
                              onChange={(e) => setAuditSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-semibold outline-none"
                              style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                            />
                          </div>

                          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
                            {['ALL', 'Relocation Order', 'Dispatches', 'System Overrides', 'AI Assessments'].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setAuditCategoryFilter(cat)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                                  auditCategoryFilter === cat ? 'bg-amber-500 text-stone-900 font-black shadow' : 'bg-black/10 dark:bg-white/10 opacity-70 hover:opacity-100'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
                          {filteredAuditLogs.map((log) => (
                            <div key={log.id} className="p-3 rounded-xl border bg-black/5 dark:bg-white/5 flex justify-between items-start gap-2" style={{ borderColor: currentTheme.border }}>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-extrabold text-amber-600 dark:text-amber-400">[{log.user}]</span>
                                  <span className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[9px] font-bold uppercase">{log.category || 'System'}</span>
                                </div>
                                <p className="font-medium mt-1" style={{ color: currentTheme.textPrimary }}>{log.action}</p>
                              </div>
                              <span className="text-[10px] font-mono shrink-0" style={{ color: currentTheme.textMuted }}>{log.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* VIEW 3: EMERGENCY DISPATCH FORM */}
        {view === 'emergency_form' && (
          <div 
            className="border rounded-3xl p-5 sm:p-8 shadow-2xl max-w-2xl w-full text-left relative transition-all"
            style={{ 
              backgroundColor: currentTheme.bgCard, 
              borderColor: currentTheme.border,
              boxShadow: `0 20px 40px ${currentTheme.cardShadow}`
            }}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b gap-2" style={{ borderColor: currentTheme.border }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center animate-pulse shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-red-600 dark:text-red-400 uppercase tracking-tight">
                    Emergency Dispatch Form
                  </h2>
                  <p className="text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                    Multilingual Voice & Text Help Input
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 bg-black/5 dark:bg-white/10 p-1.5 rounded-xl border" style={{ borderColor: currentTheme.border }}>
                <Globe className="w-4 h-4 ml-1" style={{ color: currentTheme.textMuted }} />
                <select 
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-transparent text-xs font-bold outline-none cursor-pointer pr-1"
                  style={{ color: currentTheme.textPrimary }}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-black">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <form onSubmit={submitEmergencyForm} className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: currentTheme.textMuted }}>
                  Select Emergency Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Medical Emergency', name: 'Medical', icon: Stethoscope },
                    { id: 'Fire Help', name: 'Fire Help', icon: Flame },
                    { id: 'Police Help', name: 'Police Help', icon: Siren },
                    { id: 'Accident', name: 'Accident', icon: Car }
                  ].map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = emergencyCategoryInput === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setEmergencyCategoryInput(cat.id)}
                        className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center space-y-1.5 border transition-all ${
                          isSelected 
                            ? 'bg-red-600 text-white border-red-500 shadow-md scale-105' 
                            : 'bg-black/5 dark:bg-white/5 opacity-80 hover:opacity-100'
                        }`}
                        style={{ borderColor: isSelected ? undefined : currentTheme.border, color: isSelected ? undefined : currentTheme.textPrimary }}
                      >
                        <CatIcon className="w-5 h-5" />
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 rounded-2xl border bg-black/5 dark:bg-white/5 text-center relative overflow-hidden" style={{ borderColor: currentTheme.border }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: currentTheme.textMuted }}>
                  Tap Mic & Speak in Any Language
                </p>

                <button
                  type="button"
                  onClick={toggleListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-90 cursor-pointer ${
                    isListening 
                      ? 'bg-red-600 text-white ring-8 ring-red-500/30 scale-105' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  title="Click to speak your emergency"
                >
                  <Mic className={`w-10 h-10 ${isListening ? 'animate-bounce' : ''}`} />
                </button>

                {isListening ? (
                  <div className="flex items-center space-x-1.5 mt-4 h-8">
                    <div className="w-1 h-6 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-8 bg-red-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-5 bg-red-500 rounded-full animate-bounce delay-150"></div>
                    <span className="text-xs font-bold text-red-600 ml-2 animate-pulse">Listening... Speak now</span>
                  </div>
                ) : (
                  <p className="text-[11px] font-semibold mt-3" style={{ color: currentTheme.textMuted }}>
                    Microphone Ready ({LANGUAGES.find(l => l.code === selectedLang)?.name})
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.textMuted }}>
                    Emergency Details
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                    className="text-xs font-extrabold flex items-center space-x-1.5 px-3 py-1 rounded-lg border hover:brightness-95 transition-all"
                    style={{ 
                      backgroundColor: currentTheme.btnAuth, 
                      borderColor: currentTheme.border,
                      color: currentTheme.textPrimary 
                    }}
                  >
                    <Keyboard className="w-3.5 h-3.5" />
                    <span>{showVirtualKeyboard ? 'Hide Keyboard' : 'On-Screen Keyboard'}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={emergencyText}
                  onChange={(e) => setEmergencyText(e.target.value)}
                  placeholder="Describe what happened, location, or injured count..."
                  className="w-full p-4 rounded-2xl border text-sm font-medium outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.03)', 
                    borderColor: currentTheme.border,
                    color: currentTheme.textPrimary 
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-red-600 text-white font-black text-sm sm:text-base shadow-xl flex items-center justify-center space-x-2 transition-all active:scale-95 hover:bg-red-700 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Transmitting Emergency Coordinates...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>SEND EMERGENCY ALERT NOW</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* VIEW 4: EMERGENCY SUCCESS CONFIRMATION SCREEN */}
        {view === 'emergency_success' && (
          <div 
            className="border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-lg w-full text-center relative backdrop-blur-xl"
            style={{ 
              backgroundColor: currentTheme.bgCard, 
              borderColor: currentTheme.border,
              boxShadow: `0 20px 50px ${currentTheme.cardShadow}`
            }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-5 shadow-xl animate-bounce">
              <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>

            <span className="inline-block px-3.5 py-1 bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-xs font-black rounded-full mb-3 tracking-widest uppercase">
              Dispatch ID: {dispatchId}
            </span>

            <h2 className="text-xl sm:text-2xl font-black mb-3 leading-snug text-emerald-700 dark:text-emerald-300">
              Message is successfully sent and help is near you
            </h2>

            <p className="text-xs font-medium leading-relaxed mb-6" style={{ color: currentTheme.textMuted }}>
              Your emergency signal, live Google Maps GPS coordinates, and transcribed data have been routed directly to our Authorized Security Command Center.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => window.open('tel:911')}
                className="w-full py-3.5 px-6 rounded-2xl bg-red-600 text-white font-black text-xs sm:text-sm shadow-xl hover:bg-red-700 transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Call Hotline Directly (911 / 112)</span>
              </button>

              <button
                onClick={handleRequestGoHome}
                className="w-full py-3 px-6 rounded-2xl border text-xs font-bold hover:brightness-95 transition-all flex items-center justify-center space-x-2"
                style={{ 
                  backgroundColor: currentTheme.btnAuth, 
                  borderColor: currentTheme.border,
                  color: currentTheme.textPrimary 
                }}
              >
                <Home className="w-4 h-4" />
                <span>Return to Home Page</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Emergency Map Modal */}
      {selectedEmergencyForMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="border w-full max-w-5xl rounded-3xl p-4 sm:p-7 shadow-2xl relative overflow-hidden transition-all text-left space-y-4 max-h-[92vh] overflow-y-auto"
            style={{ 
              backgroundColor: currentTheme.bgCard, 
              borderColor: currentTheme.border 
            }}
          >
            <div className="flex justify-between items-start pb-3 border-b" style={{ borderColor: currentTheme.border }}>
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-2xl text-white ${
                  selectedEmergencyForMap.status === 'RESOLVED' ? 'bg-emerald-600' : 'bg-red-600 animate-pulse'
                }`}>
                  <Map className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-black text-red-600 dark:text-red-400">
                    {selectedEmergencyForMap.dispatchId}
                  </span>
                  <h3 className="text-base sm:text-xl font-black mt-0.5" style={{ color: currentTheme.textPrimary }}>
                    Google Maps Emergency & Crowd Command
                  </h3>
                </div>
              </div>

              <button 
                onClick={() => setSelectedEmergencyForMap(null)}
                className="p-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-red-500/20 text-stone-700 dark:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 relative h-72 sm:h-80 lg:h-[420px] rounded-2xl border overflow-hidden bg-stone-900 border-red-500/40 shadow-2xl flex flex-col justify-between p-3">
                <div ref={mapContainerRef} className="absolute inset-0 z-0"></div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: currentTheme.textMuted }}>
                    Victim Message
                  </h4>
                  <div className="p-3 rounded-xl border bg-black/5 dark:bg-white/5 text-xs font-semibold leading-relaxed" style={{ borderColor: currentTheme.border }}>
                    "{selectedEmergencyForMap.text}"
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {selectedEmergencyForMap.status !== 'RESOLVED' ? (
                    <button
                      type="button"
                      onClick={() => updateEmergencyStatus(selectedEmergencyForMap.id, 'RESOLVED')}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-extrabold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Resolved & Shift to History</span>
                    </button>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-xs font-extrabold text-center flex items-center justify-center space-x-1.5 border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Incident Resolved & Archived</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Selection & Auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div 
            className="border w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all"
            style={{ backgroundColor: currentTheme.bgCard, borderColor: currentTheme.border }}
            role="dialog"
            aria-modal="true"
          >
            {modalStep === 'select_role' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: currentTheme.textPrimary }}>
                    Who You Are ?
                  </h2>
                </div>

                <div className="space-y-3.5">
                  <button
                    onClick={() => handleSelectRole('authorized')}
                    className="w-full py-3.5 px-4 rounded-2xl border font-bold text-sm shadow-sm transition-all flex items-center justify-between group hover:shadow-md active:scale-95 cursor-pointer"
                    style={{ backgroundColor: currentTheme.btnAuth, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                  >
                    <span>Authorized person</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleSelectRole('emergency')}
                    className="w-full py-3.5 px-4 rounded-2xl bg-red-600 text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-between group active:scale-95 hover:bg-red-700 cursor-pointer"
                  >
                    <span>An Emergency</span>
                    <Radio className="w-5 h-5 text-red-100 animate-pulse" />
                  </button>
                </div>
              </div>
            )}

            {modalStep === 'authorized_login' && (
              <div>
                <div className="text-left mb-4">
                  <h2 className="text-xl font-black" style={{ color: currentTheme.textPrimary }}>
                    Authorized Verification
                  </h2>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-xs font-extrabold mb-1" style={{ color: currentTheme.textPrimary }}>
                      Badge ID / Username
                    </label>
                    <input
                      type="text"
                      value={badgeIdInput}
                      onChange={(e) => setBadgeIdInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-semibold outline-none"
                      style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1" style={{ color: currentTheme.textPrimary }}>
                      Security Access PIN
                    </label>
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-semibold outline-none"
                      style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <button type="button" onClick={handleQuickDemoFill} className="font-bold underline text-amber-700 dark:text-amber-300">
                      Auto-fill Test Badge (AUTH-8821 / 7749)
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3 px-5 rounded-2xl font-extrabold text-xs shadow-md transition-all active:scale-95"
                    style={{ backgroundColor: currentTheme.btnAuth, color: currentTheme.textPrimary, borderColor: currentTheme.border }}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Enter Portal'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Home Modal */}
      {showConfirmHomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="border w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-center" style={{ backgroundColor: currentTheme.bgCard, borderColor: currentTheme.border }}>
            <h3 className="text-lg font-black mb-2" style={{ color: currentTheme.textPrimary }}>Return to Home Page?</h3>
            <div className="flex space-x-3 mt-4">
              <button onClick={() => setShowConfirmHomeModal(false)} className="flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold" style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}>Cancel</button>
              <button onClick={confirmGoHome} className="flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-red-600 hover:bg-red-700">Yes, Leave</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Sign Out Modal */}
      {showConfirmSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="border w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-center" style={{ backgroundColor: currentTheme.bgCard, borderColor: currentTheme.border }}>
            <h3 className="text-lg font-black mb-2" style={{ color: currentTheme.textPrimary }}>Confirm Sign Out?</h3>
            <div className="flex space-x-3 mt-4">
              <button onClick={() => setShowConfirmSignOutModal(false)} className="flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold" style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }}>Cancel</button>
              <button onClick={confirmLogOut} className="flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-red-600 hover:bg-red-700">Yes, Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Official Order Blueprint Modal */}
      {isBlueprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="border w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left space-y-5 my-8" style={{ backgroundColor: currentTheme.bgCard, borderColor: currentTheme.border }}>
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: currentTheme.border }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 font-bold flex items-center justify-center border border-amber-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-600">
                    SDMA / NDRF OFFICIAL DIRECTIVE #SDMA/2026/ORD-88219
                  </span>
                  <h3 className="text-lg font-black" style={{ color: currentTheme.textPrimary }}>
                    Official Government Relocation Blueprint & Command Order
                  </h3>
                </div>
              </div>
              <button onClick={() => setIsBlueprintModalOpen(false)} className="p-1.5 rounded-xl hover:bg-black/10"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 rounded-2xl border font-mono text-xs space-y-3" style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border }}>
              <div className="flex justify-between border-b pb-2">
                <span>Issuing Authority: <strong>State Disaster Management Authority (SDMA)</strong></span>
                <span>Command Officer: <strong>{loggedInUser?.name || 'Officer Alex Mercer'} ({loggedInUser?.badgeId})</strong></span>
              </div>

              <div className="space-y-1.5 pt-1">
                <p>• Approved Relocation Sites: <strong>Site Alpha (Chinyalisaur Ridge) & Site Beta (New Tehri)</strong></p>
                <p>• Total Allocated Emergency Budget: <strong className="text-emerald-600 dark:text-emerald-400">₹ {simTotalBudget} Crores</strong></p>
                <p>• Estimated Transport Convoy Required: <strong>{simBusesNeeded} Emergency Fleet Buses</strong></p>
                <p>• Priority Tiers Executed: <strong className="text-red-600">TIER 1 (IMMEDIATE EVACUATION & SAFE FIELD TRANSFER)</strong></p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-sans font-semibold text-emerald-800 dark:text-emerald-200">
                ✓ Approved by State Emergency Executive Command & NDRF Tactical Operations Group.
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setIsBlueprintModalOpen(false)} className="px-4 py-2.5 rounded-xl text-xs font-bold border" style={{ borderColor: currentTheme.border }}>
                Close
              </button>
              <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 text-stone-900 shadow hover:bg-amber-400">
                Print Official Command Order (PDF) 🖨️
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full py-3.5 px-6 text-center text-xs border-t mt-auto" style={{ borderColor: currentTheme.border, color: currentTheme.textMuted }}>
        <p className="font-medium">Applied Color Palette — <span className="font-mono ml-1">Light: #FFF2DB | Dark: #0B192C, #071E3D, #353941</span></p>
      </footer>
    </div>
  );
}