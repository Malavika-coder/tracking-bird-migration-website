from flask import Blueprint, jsonify, request

api_bp = Blueprint('api', __name__)

# Educational Insights
@api_bp.route('/insights')
def get_insights():
    insights = [
        {
            'icon': 'temperature-high',
            'title': 'Climate Change Impact',
            'description': 'Rising temperatures are causing shifts in migration timing and routes, affecting bird populations worldwide.'
        },
        {
            'icon': 'tree',
            'title': 'Habitat Conservation', 
            'description': 'Protecting stopover sites is crucial for migratory birds to rest and refuel during their long journeys.'
        },
        {
            'icon': 'wind',
            'title': 'Weather Patterns',
            'description': 'Birds use weather systems to aid their migration, but changing patterns create new challenges.'
        }
    ]
    return jsonify(insights)

# Filter Data
@api_bp.route('/filter-data', methods=['POST'])
def filter_data():
    data = request.json
    species = data.get('species', 'all')
    region = data.get('region', 'global')
    
    # Filter logic
    if species != 'all':
        total_routes = 8
        total_distance = 1000
    else:
        total_routes = 42
        total_distance = 8500
        
    if region != 'global':
        total_routes = int(total_routes * 0.6)
        total_distance = int(total_distance * 0.7)
    
    return jsonify({
        'totalRoutes': total_routes,
        'totalSpecies': 6,
        'totalDistance': total_distance,
        'activeSeason': 'Spring'
    })

# Bird Species Data
@api_bp.route('/species')
def get_species():
    return jsonify([
        {
            "id": "ostrich",
            "name": "Ostrich", 
            "scientificName": "Struthio camelus",
            "image": "https://cdn.pixabay.com/photo/2016/11/29/05/07/ostrich-1867237_1280.jpg",
            "migrationDistance": "0-50 km",
            "description": "World's largest bird. Non-migratory but moves seasonally for food and water.",
            "migrationType": "Nomadic", 
            "color": "#8B4513"
        },
        {
            "id": "sparrow", 
            "name": "House Sparrow",
            "scientificName": "Passer domesticus",
            "image": "https://cdn.pixabay.com/photo/2017/01/18/19/23/sparrow-1991373_1280.jpg", 
            "migrationDistance": "100-500 km",
            "description": "Partial migrant. Some populations move south in winter while others remain resident.",
            "migrationType": "Short-distance",
            "color": "#A0522D"
        },
        {
            "id": "eagle",
            "name": "Bald Eagle", 
            "scientificName": "Haliaeetus leucocephalus",
            "image": "https://cdn.pixabay.com/photo/2017/02/07/16/47/bald-eagle-2046484_1280.jpg",
            "migrationDistance": "1,000-3,000 km",
            "description": "Partial migrant. Northern populations migrate south when water sources freeze.",
            "migrationType": "Medium-distance",
            "color": "#2F4F4F"
        },
        {
            "id": "duck",
            "name": "Mallard Duck",
            "scientificName": "Anas platyrhynchos", 
            "image": "https://cdn.pixabay.com/photo/2016/11/21/13/17/duck-1845691_1280.jpg",
            "migrationDistance": "500-2,000 km",
            "description": "Strong migrant. Breeds in northern areas, winters in southern regions.",
            "migrationType": "Medium-distance",
            "color": "#228B22"
        },
        {
            "id": "swan",
            "name": "Mute Swan",
            "scientificName": "Cygnus olor",
            "image": "https://cdn.pixabay.com/photo/2017/02/28/23/00/swan-2107052_1280.jpg",
            "migrationDistance": "500-1,500 km", 
            "description": "Partial migrant. Some populations migrate while others remain in breeding areas year-round.",
            "migrationType": "Medium-distance",
            "color": "#696969"
        },
        {
            "id": "penguin",
            "name": "Emperor Penguin",
            "scientificName": "Aptenodytes forsteri",
            "image": "https://cdn.pixabay.com/photo/2016/11/21/12/39/penguin-1844737_1280.jpg",
            "migrationDistance": "100-200 km",
            "description": "Marine migrant. Undertakes long winter marches to breeding colonies.", 
            "migrationType": "Short-distance",
            "color": "#000080"
        }
    ])
# Migration Routes with Indian Locations
@api_bp.route('/migration-routes')
def get_migration_routes():
    return jsonify([
        {
            "species": "ostrich",
            "name": "Seasonal Movement", 
            "color": "#8B4513",
            "routes": [
                {"from": [28.6, 77.2], "to": [27.2, 77.9]},  # Delhi to Mathura
                {"from": [26.5, 80.3], "to": [25.3, 83.0]}   # Lucknow to Varanasi
            ]
        },
        {
            "species": "sparrow",
            "name": "House Sparrow Migration",
            "color": "#A0522D", 
            "routes": [
                {"from": [30.9, 75.8], "to": [28.6, 77.2]},  # Ludhiana to Delhi
                {"from": [28.6, 77.2], "to": [26.5, 80.3]},  # Delhi to Lucknow
                {"from": [26.5, 80.3], "to": [24.5, 80.5]}   # Lucknow to Allahabad
            ]
        },
        {
            "species": "eagle", 
            "name": "Bald Eagle Migration",
            "color": "#2F4F4F",
            "routes": [
                {"from": [34.0, 77.5], "to": [31.5, 76.5]},  # Leh to Dharamshala
                {"from": [31.5, 76.5], "to": [29.5, 77.5]},  # Dharamshala to Dehradun
                {"from": [29.5, 77.5], "to": [27.5, 78.0]},  # Dehradun to Agra
                {"from": [27.5, 78.0], "to": [25.5, 78.5]},  # Agra to Jhansi
                {"from": [25.5, 78.5], "to": [22.5, 79.5]}   # Jhansi to Nagpur
            ]
        },
        {
            "species": "duck",
            "name": "Mallard Duck Migration", 
            "color": "#228B22",
            "routes": [
                {"from": [34.5, 76.5], "to": [32.5, 75.5]},  # Kargil to Jammu
                {"from": [32.5, 75.5], "to": [30.5, 76.5]},  # Jammu to Chandigarh
                {"from": [30.5, 76.5], "to": [28.5, 77.5]},  # Chandigarh to Delhi
                {"from": [28.5, 77.5], "to": [26.5, 78.5]},  # Delhi to Gwalior
                {"from": [26.5, 78.5], "to": [24.5, 80.5]}   # Gwalior to Allahabad
            ]
        },
        {
            "species": "swan",
            "name": "Mute Swan Migration",
            "color": "#696969",
            "routes": [
                {"from": [32.7, 74.8], "to": [30.9, 75.8]},  # Jammu to Ludhiana
                {"from": [30.9, 75.8], "to": [28.6, 77.2]},  # Ludhiana to Delhi
                {"from": [28.6, 77.2], "to": [26.8, 80.9]},  # Delhi to Lucknow
                {"from": [26.8, 80.9], "to": [25.3, 83.0]},  # Lucknow to Varanasi
                {"from": [25.3, 83.0], "to": [22.5, 88.3]}   # Varanasi to Kolkata
            ]
        },
        {
            "species": "penguin",
            "name": "Emperor Penguin Journey",
            "color": "#000080",
            "routes": [
                {"from": [28.6, 77.2], "to": [26.8, 80.9]},  # Delhi to Lucknow
                {"from": [26.8, 80.9], "to": [25.3, 83.0]}   # Lucknow to Varanasi
            ]
        }
    ])

# Statistics
@api_bp.route('/statistics')
def get_statistics():
    return jsonify({
        "totalRoutes": 42,
        "totalSpecies": 6,
        "totalDistance": 8500, 
        "activeSeason": "Spring"
    })

# Migration Patterns (Line Chart Data)
@api_bp.route('/migration-patterns')
def get_migration_patterns():
    return jsonify({
        "labels": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        "datasets": [
            {
                "label": 'Migration Activity',
                "data": [25, 35, 65, 85, 70, 45, 30, 35, 60, 75, 50, 30],
                "borderColor": '#2c7873',
                "backgroundColor": 'rgba(44, 120, 115, 0.1)', 
                "tension": 0.4,
                "fill": True
            }
        ]
    })

# Species Distribution (Pie Chart Data)
@api_bp.route('/species-distribution')
def get_species_distribution():
    return jsonify({
        "labels": ["Ostrich", "House Sparrow", "Bald Eagle", "Mallard Duck", "Mute Swan", "Emperor Penguin"],
        "datasets": [{
            "data": [15, 20, 15, 20, 15, 15],
            "backgroundColor": ["#8B4513", "#A0522D", "#2F4F4F", "#228B22", "#696969", "#000080"],
            "borderWidth": 1
        }]
    })

# Filtered Charts (Updates charts when filters applied)
@api_bp.route('/filtered-charts', methods=['POST'])
def get_filtered_charts():
    data = request.json
    species = data.get('species', 'all')
    
    if species == 'all':
        return jsonify({
            'migrationPatterns': {
                'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'datasets': [{
                    'label': 'All Species',
                    'data': [25, 35, 65, 85, 70, 45, 30, 35, 60, 75, 50, 30],
                    'borderColor': '#2c7873',
                    'backgroundColor': 'rgba(44, 120, 115, 0.1)'
                }]
            },
            'speciesDistribution': {
                'labels': ["Ostrich", "Sparrow", "Eagle", "Duck", "Swan", "Penguin"],
                'datasets': [{'data': [15, 20, 15, 20, 15, 15]}]
            }
        })
    else:
        return jsonify({
            'migrationPatterns': {
                'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'datasets': [{
                    'label': species,
                    'data': [10, 15, 40, 60, 45, 30, 20, 25, 35, 50, 30, 15],
                    'borderColor': '#e74c3c',
                    'backgroundColor': 'rgba(231, 76, 60, 0.1)'
                }]
            },
            'speciesDistribution': {
                'labels': [species],
                'datasets': [{'data': [100]}]
            }
        })