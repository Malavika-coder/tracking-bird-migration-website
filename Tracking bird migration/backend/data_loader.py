from models import BirdSpecies, MigrationRoute, Statistics
import json
from datetime import datetime

def load_bird_species():
    return [
        BirdSpecies(
            id="ostrich",
            name="Ostrich",
            scientific_name="Struthio camelus",
            image="https://cdn.pixabay.com/photo/2016/11/29/05/07/ostrich-1867237_1280.jpg",
            migration_distance="0-50 km",
            description="World's largest bird. Non-migratory but moves seasonally for food and water.",
            migration_type="Nomadic",
            color="#8B4513"
        ),
        BirdSpecies(
            id="sparrow",
            name="House Sparrow",
            scientific_name="Passer domesticus",
            image="https://cdn.pixabay.com/photo/2017/01/18/19/23/sparrow-1991373_1280.jpg",
            migration_distance="100-500 km",
            description="Partial migrant. Some populations move south in winter while others remain resident.",
            migration_type="Short-distance",
            color="#A0522D"
        ),
        BirdSpecies(
            id="eagle",
            name="Bald Eagle",
            scientific_name="Haliaeetus leucocephalus",
            image="https://cdn.pixabay.com/photo/2017/02/07/16/47/bald-eagle-2046484_1280.jpg",
            migration_distance="1,000-3,000 km",
            description="Partial migrant. Northern populations migrate south when water sources freeze.",
            migration_type="Medium-distance",
            color="#2F4F4F"
        ),
        BirdSpecies(
            id="duck",
            name="Mallard Duck",
            scientific_name="Anas platyrhynchos",
            image="https://cdn.pixabay.com/photo/2016/11/21/13/17/duck-1845691_1280.jpg",
            migration_distance="500-2,000 km",
            description="Strong migrant. Breeds in northern areas, winters in southern regions.",
            migration_type="Medium-distance",
            color="#228B22"
        ),
        BirdSpecies(
            id="swan",
            name="Mute Swan",
            scientific_name="Cygnus olor",
            image="https://cdn.pixabay.com/photo/2017/02/28/23/00/swan-2107052_1280.jpg",
            migration_distance="500-1,500 km",
            description="Partial migrant. Some populations migrate while others remain in breeding areas year-round.",
            migration_type="Medium-distance",
            color="#696969"
        ),
        BirdSpecies(
            id="penguin",
            name="Emperor Penguin",
            scientific_name="Aptenodytes forsteri",
            image="https://cdn.pixabay.com/photo/2016/11/21/12/39/penguin-1844737_1280.jpg",
            migration_distance="100-200 km",
            description="Marine migrant. Undertakes long winter marches to breeding colonies.",
            migration_type="Short-distance",
            color="#000080"
        )
    ]

def load_migration_routes():
    return [
        MigrationRoute(
            species="ostrich",
            name="Seasonal Movement",
            color="#8B4513",
            routes=[
                {"from": [-20, 25], "to": [-22, 23]},
                {"from": [-15, 35], "to": [-17, 33]}
            ]
        ),
        MigrationRoute(
            species="sparrow",
            name="House Sparrow Migration",
            color="#A0522D",
            routes=[
                {"from": [55, 10], "to": [45, 5]},
                {"from": [50, -100], "to": [35, -95]}
            ]
        ),
        MigrationRoute(
            species="eagle",
            name="Bald Eagle Migration",
            color="#2F4F4F",
            routes=[
                {"from": [65, -150], "to": [45, -120]},
                {"from": [55, -100], "to": [40, -80]}
            ]
        ),
        MigrationRoute(
            species="duck",
            name="Mallard Duck Migration",
            color="#228B22",
            routes=[
                {"from": [60, -110], "to": [35, -90]},
                {"from": [55, 10], "to": [40, -5]}
            ]
        ),
        MigrationRoute(
            species="swan",
            name="Mute Swan Migration",
            color="#696969",
            routes=[
                {"from": [60, 30], "to": [50, 20]},
                {"from": [55, 10], "to": [45, 5]}
            ]
        ),
        MigrationRoute(
            species="penguin",
            name="Emperor Penguin Journey",
            color="#000080",
            routes=[
                {"from": [-77, 166], "to": [-69, 170]},
                {"from": [-70, 170], "to": [-65, 175]}
            ]
        )
    ]

def get_current_season():
    month = datetime.now().month
    if month in [12, 1, 2]:
        return "Winter"
    elif month in [3, 4, 5]:
        return "Spring"
    elif month in [6, 7, 8]:
        return "Summer"
    else:
        return "Fall"

def load_statistics():
    return Statistics(
        total_routes=42,
        total_species=6,
        total_distance=8500,
        active_season=get_current_season()
    )

def get_migration_patterns():
    return {
        'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'datasets': [
            {
                'label': 'Migration Activity',
                'data': [25, 35, 65, 85, 70, 45, 30, 35, 60, 75, 50, 30],
                'borderColor': '#2c7873',
                'backgroundColor': 'rgba(44, 120, 115, 0.1)',
                'tension': 0.4,
                'fill': True
            }
        ]
    }

def get_species_distribution():
    species = load_bird_species()
    return {
        'labels': [bird.name for bird in species],
        'datasets': [{
            'data': [15, 20, 15, 20, 15, 15],
            'backgroundColor': [bird.color for bird in species],
            'borderWidth': 1
        }]
    }

def get_educational_insights():
    return [
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