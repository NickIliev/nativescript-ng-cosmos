// tslint:disable
export class AsteroidsApiData {
    links: Link;
    element_count: number;
    near_earth_objects: AsteroidsOnDate;

    constructor(
        links: Link,
        element_count: number,
        near_earth_objects: AsteroidsOnDate
    ) {
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

    constructor(
        links: Link,
        neo_reference_id: string,
        name: string,
        nasa_jpl_url: string,
        absolute_magnitude_h: number,
        estimated_diameter: EstimatedDiameter,
        is_potentially_hazardous_asteroid: boolean,
        close_approach_data: Array<ApproachDate>
    ) {
        this.links = links;
        this.neo_reference_id = neo_reference_id;
        this.name = name;
        this.nasa_jpl_url = nasa_jpl_url;
        this.absolute_magnitude_h = absolute_magnitude_h;
        this.estimated_diameter = estimated_diameter;
        this.is_potentially_hazardous_asteroid = is_potentially_hazardous_asteroid;
        this.close_approach_data = close_approach_data;
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
    relative_velocity: RelativeVelocity;
    miss_distance: MissDistance;
    orbiting_body: string;
}

export interface MissDistance {
    astronomical: number;
    kilometers: number;
    miles: number;
}

export interface RelativeVelocity {
    kilometers_per_second: number;
    kilometers_per_hour: number;
    miles_per_hour: number;
}

// Note: OribtalData is to be used for specific asteroid lookup
// Neo - Lookup
// Lookup a specific Asteroid based on its NASA JPL small body (SPK-ID) ID
// https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY
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
