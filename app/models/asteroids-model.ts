export class AsteroidsApiData {
    links: Link;
    element_count: number;
    near_earth_objects: AsteroidsOnDate;

    constructor(links: Link, element_count: number,near_earth_objects: AsteroidsOnDate) {
        this.links = links;
        this.element_count = element_count;
        this.near_earth_objects = near_earth_objects;
    }
}

export interface AsteroidsOnDate {
    date: Array<AsteroidItem>;
}

export class AsteroidItem {
    links: Link;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameter;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: Array<ApproachDate>;
    orbital_data: OrbitalData;

    constructor(
        links: Link, 
        neo_reference_id: string, 
        name: string, 
        nasa_jpl_url: string,
        absolute_magnitude_h: number,
        estimated_diameter: EstimatedDiameter,
        is_potentially_hazardous_asteroid: boolean,
        close_approach_data: Array<ApproachDate>,
        orbital_data: OrbitalData
    ) {
        this.links = links;
        this.neo_reference_id = neo_reference_id;
        this.name = name;
        this.nasa_jpl_url = nasa_jpl_url;
        this.absolute_magnitude_h = absolute_magnitude_h;
        this.estimated_diameter = estimated_diameter;
        this.is_potentially_hazardous_asteroid = is_potentially_hazardous_asteroid;
        this.close_approach_data = close_approach_data;
        this.orbital_data = orbital_data;
    }
}

export interface Link {
    self: string;
}

export interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters;
}

export interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface ApproachDate {
    close_approach_date: string;
    miss_distance: MissDistance;
    orbiting_body: string;
}

export interface MissDistance {
    astronomical: string;
    kilometers: string;
}

export interface OrbitalData {
    OrbitalData: string;
    orbit_determination_date: string;
    orbit_uncertainty: string;
    minimum_orbit_intersection: string;
    jupiter_tisserand_invariant: string;
    epoch_osculation: string;
    eccentricity: string;
    semi_major_axis: string;
    inclination: string;
    ascending_node_longitude: string;
    orbital_period: string;
    perihelion_distance: string;
    perihelion_argument: string;
    aphelion_distance: string;
    perihelion_time: string;
    mean_anomaly: string;
    mean_motion: string;
    equinox: string;
}