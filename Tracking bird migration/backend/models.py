class BirdSpecies:
    def __init__(self, id, name, scientific_name, image, migration_distance, description, migration_type, color):
        self.id = id
        self.name = name
        self.scientific_name = scientific_name
        self.image = image
        self.migration_distance = migration_distance
        self.description = description
        self.migration_type = migration_type
        self.color = color
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'scientificName': self.scientific_name,
            'image': self.image,
            'migrationDistance': self.migration_distance,
            'description': self.description,
            'migrationType': self.migration_type,
            'color': self.color
        }

class MigrationRoute:
    def __init__(self, species, name, color, routes):
        self.species = species
        self.name = name
        self.color = color
        self.routes = routes
    
    def to_dict(self):
        return {
            'species': self.species,
            'name': self.name,
            'color': self.color,
            'routes': self.routes
        }

class Statistics:
    def __init__(self, total_routes, total_species, total_distance, active_season):
        self.total_routes = total_routes
        self.total_species = total_species
        self.total_distance = total_distance
        self.active_season = active_season
    
    def to_dict(self):
        return {
            'totalRoutes': self.total_routes,
            'totalSpecies': self.total_species,
            'totalDistance': self.total_distance,
            'activeSeason': self.active_season
        }