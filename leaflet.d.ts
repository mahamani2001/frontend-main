declare module 'leaflet' {
    export function map(id: string | HTMLElement, options?: MapOptions): Map;
    export class Map {
      constructor(id: string | HTMLElement, options?: MapOptions);
      // Add other properties and methods for the Map class
    }
    export interface MapOptions {
      // Define the options for the Map constructor
    }
    // Add other interfaces or types for Leaflet here
  }
  