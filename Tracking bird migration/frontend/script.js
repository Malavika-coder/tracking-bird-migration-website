// Bird Migration Tracker - JavaScript with Backend Connection
const API_BASE = 'http://localhost:5000/api';

// Bird species data with real images (fallback)
const localBirdSpecies = [
    {
        id: "ostrich",
        name: "Ostrich",
        scientificName: "Struthio camelus",
        image: "https://images.pexels.com/photos/798094/pexels-photo-798094.jpeg",
        migrationDistance: "0-50 km",
        description: "World's largest bird. Non-migratory but moves seasonally for food and water.",
        migrationType: "Nomadic",
        color: "#8B4513"
    },
    {
        id: "sparrow",
        name: "House Sparrow",
        scientificName: "Passer domesticus",
        image: "https://cdn.pixabay.com/photo/2017/09/17/22/14/sparrow-2760021_640.jpg",
        migrationDistance: "100-500 km",
        description: "Partial migrant. Some populations move south in winter while others remain resident.",
        migrationType: "Short-distance",
        color: "#A0522D"
    },
    {
        id: "eagle",
        name: "Bald Eagle",
        scientificName: "Haliaeetus leucocephalus",
        image: "https://www.treehugger.com/thmb/2YnUabDTlIq_O-v1lma84_e8Gu4=/3973x2384/filters:fill(auto,1)/bald-eagle-flying-117146366-f0a7d09f96ac460eb86e241c40b8c54c.jpg",
        migrationDistance: "1,000-3,000 km",
        description: "Partial migrant. Northern populations migrate south when water sources freeze.",
        migrationType: "Medium-distance",
        color: "#2F4F4F"
    },
    {
        id: "duck",
        name: "Mallard Duck",
        scientificName: "Anas platyrhynchos",
       image: "https://images.pexels.com/photos/15805492/pexels-photo-15805492.jpeg",
        migrationDistance: "500-2,000 km",
        description: "Strong migrant. Breeds in northern areas, winters in southern regions.",
        migrationType: "Medium-distance",
        color: "#228B22"
    },
    {
        id: "swan",
        name: "Mute Swan",
        scientificName: "Cygnus olor",
       image: "https://cdn.pixabay.com/photo/2015/02/21/17/03/swan-644413_1280.jpg",
        migrationDistance: "500-1,500 km",
        description: "Partial migrant. Some populations migrate while others remain in breeding areas year-round.",
        migrationType: "Medium-distance",
        color: "#696969"
    },
    {
        id: "penguin",
        name: "Emperor Penguin",
        scientificName: "Aptenodytes forsteri",
       image: "https://images.pexels.com/photos/986805/pexels-photo-986805.jpeg",
        migrationDistance: "100-200 km",
        description: "Marine migrant. Undertakes long winter marches to breeding colonies.",
        migrationType: "Short-distance",
        color: "#000080"
    }
];
// Migration routes data (fallback)
const localMigrationRoutes = [
    {
        species: "ostrich",
        name: "Seasonal Movement",
        color: "#8B4513",
        routes: [
            { from: [-20, 25], to: [-22, 23] },
            { from: [-15, 35], to: [-17, 33] }
        ]
    },
    {
        species: "sparrow",
        name: "House Sparrow Migration",
        color: "#A0522D",
        routes: [
            { from: [55, 10], to: [45, 5] },
            { from: [50, -100], to: [35, -95] }
        ]
    },
    {
        species: "eagle",
        name: "Bald Eagle Migration",
        color: "#2F4F4F",
        routes: [
            { from: [65, -150], to: [45, -120] },
            { from: [55, -100], to: [40, -80] }
        ]
    },
    {
        species: "duck",
        name: "Mallard Duck Migration",
        color: "#228B22",
        routes: [
            { from: [60, -110], to: [35, -90] },
            { from: [55, 10], to: [40, -5] }
        ]
    },
    {
        species: "swan",
        name: "Mute Swan Migration",
        color: "#696969",
        routes: [
            { from: [60, 30], to: [50, 20] },
            { from: [55, 10], to: [45, 5] }
        ]
    },
    {
        species: "penguin",
        name: "Emperor Penguin Journey",
        color: "#000080",
        routes: [
            { from: [-77, 166], to: [-69, 170] },
            { from: [-70, 170], to: [-65, 175] }
        ]
    }
];

// Local statistics (fallback)
const localStatistics = {
    totalRoutes: 42,
    totalSpecies: 6,
    totalDistance: 8500,
    activeSeason: "Spring"
};

// Load all data from backend
async function loadAllData() {
    try {
        console.log('Attempting to connect to backend...');
        
        // Test if backend is available by calling the one endpoint we know exists
        const testResponse = await fetch(`${API_BASE}/insights`);
        
        if (!testResponse.ok) {
            throw new Error('Backend not responding properly');
        }

        console.log('Backend is available, using local data with backend connection for filters');
        
        // Backend is available, but we'll use local data for everything except filters
        // since the other endpoints don't exist yet
        return loadLocalData();
        
    } catch (error) {
        console.warn('Backend not available, using local data only:', error.message);
        // Fallback to local data if backend is unavailable
        return loadLocalData();
    }
}

// Fallback local data
function loadLocalData() {
    console.log('Using local data');
    return {
        birdSpecies: localBirdSpecies,
        migrationRoutes: localMigrationRoutes,
        statistics: localStatistics,
        educationalInsights: [
            {
                icon: 'temperature-high',
                title: 'Climate Change Impact',
                description: 'Rising temperatures are causing shifts in migration timing and routes, affecting bird populations worldwide.'
            },
            {
                icon: 'tree',
                title: 'Habitat Conservation',
                description: 'Protecting stopover sites is crucial for migratory birds to rest and refuel during their long journeys.'
            },
            {
                icon: 'wind',
                title: 'Weather Patterns',
                description: 'Birds use weather systems to aid their migration, but changing patterns create new challenges.'
            }
        ]
    };
}

// Global variables
let map;
let migrationChart;
let speciesChart;

// Initialize the application with backend data
async function initializeApp() {
    console.log('Initializing app...');
    const data = await loadAllData();
    
    // Initialize map with routes from backend
    initMap(data.migrationRoutes);
    
    // Initialize charts with initial "All" data
    initCharts('all', 'all');
    
    // Populate species grid with data from backend
    populateSpeciesGrid(data.birdSpecies);
    
    // Update statistics with data from backend
    updateStatistics(data.statistics);
    
    // Setup filters with backend connection
    setupFilters();
    
    // Populate educational insights
    populateEducationalInsights(data.educationalInsights);
    
    // START LIVE BIRD TRACKING
    window.activeBirds = startLiveTracking();
    
    console.log('App initialized successfully');
}

// Initialize the map
function initMap(migrationRoutes) {
    map = L.map('migration-map').setView([30, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    addMigrationRoutes(migrationRoutes);
    addMapLegend(migrationRoutes);
}

// Add migration routes to the map
function addMigrationRoutes(migrationRoutes) {
    migrationRoutes.forEach(speciesRoute => {
        speciesRoute.routes.forEach(route => {
            const curve = createCurve(route.from, route.to);
            L.polyline(curve, {
                color: speciesRoute.color,
                weight: 4,
                opacity: 0.7,
                dashArray: speciesRoute.species === 'ostrich' ? '5, 10' : '10, 10'
            }).addTo(map).bindPopup(`<b>${speciesRoute.name}</b><br>${getSpeciesName(speciesRoute.species)}`);
            
            L.circleMarker(route.from, {
                color: speciesRoute.color,
                fillColor: speciesRoute.color,
                fillOpacity: 0.7,
                radius: 6
            }).addTo(map).bindPopup(`<b>${getSpeciesName(speciesRoute.species)}</b><br>Starting Point`);
            
            L.circleMarker(route.to, {
                color: speciesRoute.color,
                fillColor: speciesRoute.color,
                fillOpacity: 0.7,
                radius: 6
            }).addTo(map).bindPopup(`<b>${getSpeciesName(speciesRoute.species)}</b><br>Destination`);
        });
    });
}

// Create a curved line between two points
function createCurve(from, to) {
    const curve = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = from[0] + (to[0] - from[0]) * t;
        const curveFactor = Math.sin(Math.PI * t) * 15;
        const lng = from[1] + (to[1] - from[1]) * t + curveFactor;
        curve.push([lat, lng]);
    }
    
    return curve;
}

// Add map legend
function addMapLegend(migrationRoutes) {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '15px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
        div.style.fontSize = '14px';
        
        let labels = '<h4 style="margin: 0 0 10px; color: #004445;">Migration Routes</h4>';
        migrationRoutes.forEach(route => {
            labels += `<div class="legend-item">
                <div class="legend-color" style="background-color: ${route.color};"></div>
                ${getSpeciesName(route.species)}
            </div>`;
        });
        
        div.innerHTML = labels;
        return div;
    };
    legend.addTo(map);
}

// Get species name from ID
function getSpeciesName(speciesId) {
    if (speciesId === 'all') return 'All Species';
    const species = localBirdSpecies.find(bird => bird.id === speciesId);
    return species ? species.name : speciesId;
}

// Get species color from ID
function getSpeciesColor(speciesId) {
    if (speciesId === 'all') return '#2c7873';
    const species = localBirdSpecies.find(bird => bird.id === speciesId);
    return species ? species.color : '#2c7873';
}

// Initialize charts with data
function initCharts(species = 'all', season = 'all') {
    console.log('Initializing charts for:', species, 'season:', season);
    
    const migrationCanvas = document.getElementById('migration-chart');
    const speciesCanvas = document.getElementById('species-chart');
    
    if (!migrationCanvas || !speciesCanvas) {
        console.error('Chart canvases not found!');
        return;
    }
    
    // Get chart data for the selected species
    const migrationPatterns = getSpeciesMigrationPatterns(species, season);
    const speciesDistribution = getSpeciesDistribution(species);
    
    // Get 2D contexts
    const migrationCtx = migrationCanvas.getContext('2d');
    const speciesCtx = speciesCanvas.getContext('2d');
    
    // Destroy existing charts if they exist
    if (migrationChart) migrationChart.destroy();
    if (speciesChart) speciesChart.destroy();
    
    try {
        // Create line chart for migration patterns
        migrationChart = new Chart(migrationCtx, {
            type: 'line',
            data: migrationPatterns,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Activity Level (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Migration Activity'
                    }
                }
            }
        });
        
        // Create doughnut chart for species distribution
        speciesChart = new Chart(speciesCtx, {
            type: 'doughnut',
            data: speciesDistribution,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: 'Species Distribution'
                    }
                }
            }
        });
        
        console.log('✅ Charts initialized successfully');
        
    } catch (error) {
        console.error('❌ Chart creation failed:', error);
    }
}

// Update charts with new data
function updateCharts(species = 'all', season = 'all') {
    console.log('Updating charts for:', species, 'season:', season);
    
    const migrationPatterns = getSpeciesMigrationPatterns(species, season);
    const speciesDistribution = getSpeciesDistribution(species);
    
    if (migrationChart) {
        migrationChart.data = migrationPatterns;
        migrationChart.update();
    }
    
    if (speciesChart) {
        speciesChart.data = speciesDistribution;
        speciesChart.update();
    }
}

// Get different migration patterns for each species
function getSpeciesMigrationPatterns(species = 'all', season = 'all') {
    let basePattern;
    
    // DIFFERENT PATTERNS FOR EACH SPECIES
    switch(species) {
        case 'ostrich':
            basePattern = [10, 12, 15, 18, 22, 25, 23, 20, 18, 15, 12, 10]; // Nomadic movement
            break;
        case 'sparrow':
            basePattern = [20, 25, 45, 65, 75, 80, 70, 60, 55, 45, 35, 25]; // Short-distance
            break;
        case 'eagle':
            basePattern = [5, 8, 25, 60, 85, 90, 80, 70, 50, 35, 20, 10]; // Medium-distance
            break;
        case 'duck':
            basePattern = [10, 15, 40, 75, 95, 100, 90, 80, 65, 50, 30, 15]; // Strong migrant
            break;
        case 'swan':
            basePattern = [15, 20, 40, 70, 85, 90, 80, 75, 60, 45, 30, 20]; // Partial migrant
            break;
        case 'penguin':
            basePattern = [35, 40, 45, 50, 55, 60, 75, 80, 70, 60, 50, 40]; // Marine migrant
            break;
        default: // 'all' species
            basePattern = [25, 30, 55, 75, 80, 85, 70, 65, 60, 55, 40, 30];
    }
    
    // Adjust for season filter
    if (season !== 'all') {
        if (season === 'spring') {
            // Emphasize March-June (higher values)
            basePattern = basePattern.map((value, index) => {
                if (index >= 2 && index <= 5) { // March to June
                    return Math.min(100, value + 25);
                }
                return Math.max(5, value - 10);
            });
        } else if (season === 'fall') {
            // Emphasize August-November (higher values)
            basePattern = basePattern.map((value, index) => {
                if (index >= 7 && index <= 10) { // August to November
                    return Math.min(100, value + 25);
                }
                return Math.max(5, value - 10);
            });
        }
    }
    
    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: species === 'all' ? 'Migration Activity' : `${getSpeciesName(species)} Migration`,
                data: basePattern,
                borderColor: getSpeciesColor(species),
                backgroundColor: 'rgba(44, 120, 115, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }
        ]
    };
}

// Get different species distribution for each selection
function getSpeciesDistribution(species = 'all') {
    if (species === 'all') {
        // Show all species when "All" is selected
        return {
            labels: localBirdSpecies.map(bird => bird.name),
            datasets: [{
                data: [18, 22, 15, 20, 12, 13], // Different values for each species
                backgroundColor: localBirdSpecies.map(bird => bird.color),
                borderWidth: 2
            }]
        };
    } else {
        // Show only selected species with related species
        const selectedSpecies = localBirdSpecies.find(bird => bird.id === species);
        return {
            labels: [selectedSpecies.name, 'Related Species', 'Other Birds'],
            datasets: [{
                data: [65, 25, 10], // Selected species gets 65%
                backgroundColor: [selectedSpecies.color, '#95a5a6', '#bdc3c7'],
                borderWidth: 2
            }]
        };
    }
}

// Populate species grid
function populateSpeciesGrid(birdSpecies) {
    const speciesGrid = document.getElementById('species-grid');
    if (!speciesGrid) {
        console.error('Species grid element not found!');
        return;
    }
    
    speciesGrid.innerHTML = '';
    
    birdSpecies.forEach(species => {
        const card = document.createElement('div');
        card.className = 'species-card';
        card.innerHTML = `
            <img src="${species.image}" alt="${species.name}" onerror="this.src='https://via.placeholder.com/250x160/cccccc/666666?text=Bird+Image'">
            <h4>${species.name}</h4>
            <p class="scientific">${species.scientificName}</p>
            <p class="distance">Migration: ${species.migrationDistance}</p>
            <p class="description">${species.description}</p>
        `;
        
        card.addEventListener('click', () => {
            document.getElementById('species-select').value = species.id;
            applyFilters();
        });
        
        speciesGrid.appendChild(card);
    });
    
    console.log('Species grid populated with', birdSpecies.length, 'species');
}

// Update statistics
function updateStatistics(statistics) {
    document.getElementById('total-routes').textContent = statistics.totalRoutes;
    document.getElementById('total-species').textContent = statistics.totalSpecies;
    document.getElementById('total-distance').textContent = statistics.totalDistance.toLocaleString();
    document.getElementById('active-season').textContent = statistics.activeSeason;
}

// Populate educational insights
function populateEducationalInsights(insights) {
    const insightsGrid = document.querySelector('.insights-grid');
    if (insightsGrid) {
        insightsGrid.innerHTML = '';
        
        insights.forEach(insight => {
            const insightCard = document.createElement('div');
            insightCard.className = 'insight-card';
            insightCard.innerHTML = `
                <i class="fas fa-${insight.icon}"></i>
                <h3>${insight.title}</h3>
                <p>${insight.description}</p>
            `;
            insightsGrid.appendChild(insightCard);
        });
    }
}

// Filter functionality
function setupFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    applyFiltersBtn.addEventListener('click', applyFilters);
    
    resetFiltersBtn.addEventListener('click', function() {
        document.getElementById('species-select').value = 'all';
        document.getElementById('region-select').value = 'global';
        document.getElementById('season-select').value = 'all';
        document.getElementById('distance-select').value = 'all';
        updateStatistics(localStatistics);
        updateCharts('all', 'all'); // Reset charts too
    });
}

async function applyFilters() {
    const species = document.getElementById('species-select').value;
    const region = document.getElementById('region-select').value;
    const season = document.getElementById('season-select').value;
    const distance = document.getElementById('distance-select').value;
    
    console.log('Applying filters:', { species, region, season, distance });
    
    const applyBtn = document.getElementById('apply-filters');
    const originalText = applyBtn.innerHTML;
    applyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
    applyBtn.disabled = true;
    
    try {
        // Try to get data from backend first
        const [statsResponse, chartsResponse] = await Promise.all([
            fetch(`${API_BASE}/filter-data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ species, region, season, distance })
            }),
            fetch(`${API_BASE}/filtered-charts`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ species, region, season, distance })
            })
        ]);
        
        if (statsResponse.ok && chartsResponse.ok) {
            const filteredStats = await statsResponse.json();
            const filteredCharts = await chartsResponse.json();
            
            // Update statistics
            updateStatistics(filteredStats);
            
            // Update charts with filtered data
            updateCharts(species, season);
            
            applyBtn.innerHTML = '<i class="fas fa-check"></i> Filters Applied';
            applyBtn.style.background = '#27ae60';
        } else {
            throw new Error('Backend filter failed');
        }
        
    } catch (error) {
        console.log('Using local filtering:', error.message);
        // Use local filtering
        updateLocalStats(species, region);
        updateCharts(species, season); // Update charts with local data
        
        applyBtn.innerHTML = '<i class="fas fa-check"></i> Filters Applied (Local)';
        applyBtn.style.background = '#f39c12';
    }
    
    setTimeout(() => {
        applyBtn.innerHTML = originalText;
        applyBtn.style.background = '';
        applyBtn.disabled = false;
    }, 1500);
}

// Local stats update (fallback)
function updateLocalStats(species = 'all', region = 'global') {
    let routes, totalDistance, totalSpecies, activeSeason;
    
    // DIFFERENT STATS FOR EACH SPECIES
    switch(species) {
        case 'ostrich':
            routes = 8;
            totalDistance = 120;
            totalSpecies = 1;
            activeSeason = "Dry Season";
            break;
        case 'sparrow':
            routes = 15;
            totalDistance = 300;
            totalSpecies = 1;
            activeSeason = "Winter";
            break;
        case 'eagle':
            routes = 12;
            totalDistance = 2000;
            totalSpecies = 1;
            activeSeason = "Fall";
            break;
        case 'duck':
            routes = 20;
            totalDistance = 1500;
            totalSpecies = 1;
            activeSeason = "Spring";
            break;
        case 'swan':
            routes = 10;
            totalDistance = 800;
            totalSpecies = 1;
            activeSeason = "Winter";
            break;
        case 'penguin':
            routes = 6;
            totalDistance = 180;
            totalSpecies = 1;
            activeSeason = "Winter";
            break;
        default: // 'all' species
            routes = 42;
            totalDistance = 8500;
            totalSpecies = 6;
            activeSeason = "Spring";
    }
    
    // Adjust for region
    if (region !== 'global') {
        routes = Math.floor(routes * 0.6);
        totalDistance = Math.floor(totalDistance * 0.7);
    }
    
    document.getElementById('total-routes').textContent = routes;
    document.getElementById('total-distance').textContent = totalDistance.toLocaleString();
    document.getElementById('total-species').textContent = totalSpecies;
    document.getElementById('active-season').textContent = activeSeason;
}

// ==================== LIVE BIRD TRACKING SYSTEM ====================

// Live Bird Tracking Simulation
function startLiveTracking() {
    console.log('Starting live bird tracking...');
    
    // Create custom bird icon
    const birdIcon = L.divIcon({
        className: 'bird-marker',
        html: '<i class="fas fa-dove" style="color: #e74c3c; font-size: 20px;"></i>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    // Sample bird flight data
    const birds = [
        {
            id: 'eagle-1',
            name: 'Bald Eagle',
            path: [
                [65, -150], [62, -145], [59, -140], [56, -135], 
                [53, -130], [50, -125], [47, -120], [44, -115]
            ],
            color: '#2F4F4F',
            speed: 2000 // ms between moves
        },
        {
            id: 'duck-1', 
            name: 'Mallard Duck',
            path: [
                [60, -110], [57, -108], [54, -106], [51, -104],
                [48, -102], [45, -100], [42, -98], [39, -96]
            ],
            color: '#228B22',
            speed: 1500
        },
        {
            id: 'swan-1',
            name: 'Mute Swan',
            path: [
                [55, 10], [53, 8], [51, 6], [49, 4],
                [47, 2], [45, 0], [43, -2], [41, -4]
            ],
            color: '#696969',
            speed: 1800
        },
        {
            id: 'ostrich-1',
            name: 'Ostrich',
            path: [[-20, 25], [-19, 24], [-18, 23], [-17, 22], [-16, 21], [-15, 20], [-14, 19]],
            color: '#8B4513',
            speed: 3000
        },
        {
            id: 'sparrow-1',
            name: 'House Sparrow', 
            path: [[55, 10], [52, 9], [49, 8], [46, 7], [43, 6], [40, 5], [37, 4]],
            color: '#A0522D',
            speed: 1200
        },
        {
            id: 'penguin-1',
            name: 'Emperor Penguin',
            path: [[-77, 166], [-76, 167], [-75, 168], [-74, 169], [-73, 170], [-72, 171], [-71, 172]],
            color: '#000080',
            speed: 4000
        }
    ];
    
    // Track all active birds
    const activeBirds = [];
    
    birds.forEach(bird => {
        // Create marker for this bird
        const marker = L.marker(bird.path[0], { 
            icon: birdIcon,
            title: bird.name
        }).addTo(map);
        
        // Add popup with bird info
        marker.bindPopup(`
            <div class="bird-popup">
                <h4>${bird.name}</h4>
                <p><strong>Status:</strong> <span class="bird-status">In Flight</span></p>
                <p><strong>Speed:</strong> ${bird.speed}ms</p>
                <button onclick="stopBirdTracking('${bird.id}')">Stop Tracking</button>
            </div>
        `);
        
        const birdData = {
            id: bird.id,
            name: bird.name,
            marker: marker,
            path: bird.path,
            currentStep: 0,
            interval: null,
            color: bird.color
        };
        
        activeBirds.push(birdData);
        startBirdFlight(birdData);
    });
    
    // Add tracking controls
    addTrackingControls(activeBirds);
    
    return activeBirds;
}

// Start individual bird flight
function startBirdFlight(bird) {
    bird.currentStep = 0;
    
    bird.interval = setInterval(() => {
        if (bird.currentStep < bird.path.length) {
            // Move to next position
            bird.marker.setLatLng(bird.path[bird.currentStep]);
            
            // Update popup with current position
            const [lat, lng] = bird.path[bird.currentStep];
            bird.marker.setPopupContent(`
                <div class="bird-popup">
                    <h4>${bird.name}</h4>
                    <p><strong>Status:</strong> <span class="bird-status">In Flight</span></p>
                    <p><strong>Position:</strong> ${lat.toFixed(2)}, ${lng.toFixed(2)}</p>
                    <p><strong>Progress:</strong> ${bird.currentStep + 1}/${bird.path.length}</p>
                    <button onclick="stopBirdTracking('${bird.id}')">Stop Tracking</button>
                </div>
            `);
            
            bird.currentStep++;
        } else {
            // Flight completed
            clearInterval(bird.interval);
            bird.marker.setPopupContent(`
                <div class="bird-popup">
                    <h4>${bird.name}</h4>
                    <p><strong>Status:</strong> <span style="color: #27ae60;">Journey Completed! 🎉</span></p>
                    <button onclick="restartBirdTracking('${bird.id}')">Restart Flight</button>
                </div>
            `);
        }
    }, bird.speed);
}

// Stop tracking a specific bird
function stopBirdTracking(birdId) {
    const bird = window.activeBirds.find(b => b.id === birdId);
    if (bird && bird.interval) {
        clearInterval(bird.interval);
        bird.marker.setPopupContent(`
            <div class="bird-popup">
                <h4>${bird.name}</h4>
                <p><strong>Status:</strong> <span style="color: #e74c3c;">Tracking Stopped</span></p>
                <button onclick="restartBirdTracking('${bird.id}')">Resume Flight</button>
            </div>
        `);
    }
}

// Restart tracking for a bird
function restartBirdTracking(birdId) {
    const bird = window.activeBirds.find(b => b.id === birdId);
    if (bird) {
        startBirdFlight(bird);
    }
}

// Add tracking controls to the map
function addTrackingControls(activeBirds) {
    const control = L.control({ position: 'topright' });
    
    control.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'tracking-controls');
        div.innerHTML = `
            <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
                <h4 style="margin: 0 0 8px 0;">Live Tracking</h4>
                <button onclick="stopAllTracking()" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 5px;">
                    Stop All
                </button>
                <button onclick="startAllTracking()" style="background: #27ae60; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                    Start All
                </button>
                <div style="margin-top: 8px; font-size: 12px;">
                    ${activeBirds.length} birds tracking
                </div>
            </div>
        `;
        return div;
    };
    
    control.addTo(map);
}

// Stop all bird tracking
function stopAllTracking() {
    if (window.activeBirds) {
        window.activeBirds.forEach(bird => {
            if (bird.interval) {
                clearInterval(bird.interval);
            }
        });
    }
}

// Start all bird tracking
function startAllTracking() {
    if (window.activeBirds) {
        window.activeBirds.forEach(bird => {
            startBirdFlight(bird);
        });
    }
}

// Make tracking functions globally available
window.stopBirdTracking = stopBirdTracking;
window.restartBirdTracking = restartBirdTracking;
window.stopAllTracking = stopAllTracking;
window.startAllTracking = startAllTracking;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bird Migration Tracker initializing...');
    initializeApp();
    
    // Add connection status indicator
    const connectionStatus = document.createElement('div');
    connectionStatus.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        z-index: 1000;
        background: #f39c12;
        color: white;
    `;
    connectionStatus.textContent = 'Connecting...';
    document.body.appendChild(connectionStatus);
    
    // Update connection status after initialization
    setTimeout(() => {
        loadAllData().then(data => {
            if (data.birdSpecies === localBirdSpecies) {
                connectionStatus.textContent = 'Local Mode';
                connectionStatus.style.background = '#e74c3c';
            } else {
                connectionStatus.textContent = 'Backend Connected';
                connectionStatus.style.background = '#27ae60';
            }
        });
    }, 1000);
});