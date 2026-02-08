import folium

# Create base map centered on India
m = folium.Map(location=[23.5, 80], zoom_start=5)

# Sample data - Multiple stopovers for each bird with INDIAN locations
bird_routes = {
    "Bald Eagle": {
        "color": "blue",
        "route": [
            {"lat": 34.0, "lon": 77.5, "name": "Leh, Ladakh (Start)", "stopover": True},
            {"lat": 31.5, "lon": 76.5, "name": "Dharamshala Rest", "stopover": True},
            {"lat": 29.5, "lon": 77.5, "name": "Dehradun Feeding", "stopover": True},
            {"lat": 27.5, "lon": 78.0, "name": "Agra Stop", "stopover": True},
            {"lat": 25.5, "lon": 78.5, "name": "Jhansi Rest", "stopover": True},
            {"lat": 22.5, "lon": 79.5, "name": "Nagpur (End)", "stopover": True}
        ]
    },
    "House Sparrow": {
        "color": "green", 
        "route": [
            {"lat": 30.9, "lon": 75.8, "name": "Ludhiana (Start)", "stopover": True},
            {"lat": 29.4, "lon": 76.9, "name": "Rohtak Rest", "stopover": True},
            {"lat": 28.6, "lon": 77.2, "name": "Delhi Feeding", "stopover": True},
            {"lat": 27.2, "lon": 77.9, "name": "Mathura Stop", "stopover": True},
            {"lat": 26.5, "lon": 80.3, "name": "Lucknow (End)", "stopover": True}
        ]
    },
    "Mallard Duck": {
        "color": "orange",
        "route": [
            {"lat": 34.5, "lon": 76.5, "name": "Kargil (Start)", "stopover": True},
            {"lat": 32.5, "lon": 75.5, "name": "Jammu Rest", "stopover": True},
            {"lat": 30.5, "lon": 76.5, "name": "Chandigarh Stop", "stopover": True},
            {"lat": 28.5, "lon": 77.5, "name": "Delhi Feeding", "stopover": True},
            {"lat": 26.5, "lon": 78.5, "name": "Gwalior Rest", "stopover": True},
            {"lat": 24.5, "lon": 80.5, "name": "Allahabad (End)", "stopover": True}
        ]
    }
}

# Add routes to map
for bird, data in bird_routes.items():
    route_points = [(point["lat"], point["lon"]) for point in data["route"]]
    
    # Draw the migration route line
    folium.PolyLine(
        route_points,
        color=data["color"],
        weight=3,
        opacity=0.7,
        popup=f"{bird} Migration Route",
        tooltip=f"Click to see {bird} route"
    ).add_to(m)
    
    # Add markers for each stopover point
    for i, point in enumerate(data["route"]):
        if point["stopover"]:
            # Different icons for start, stopovers, and end
            if i == 0:
                icon_color = "green"  # Start point
            elif i == len(data["route"]) - 1:
                icon_color = "red"    # End point
            else:
                icon_color = "blue"   # Stopover points
            
            folium.Marker(
                location=[point["lat"], point["lon"]],
                popup=f"<b>{bird}</b><br>{point['name']}",
                tooltip=f"{bird}: {point['name']}",
                icon=folium.Icon(color=icon_color, icon='info-sign')
            ).add_to(m)

# Save map
m.save('bird_migration_india.html')
print("Map created successfully! Open 'bird_migration_india.html' in your browser.")