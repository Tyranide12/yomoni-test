/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/characters` | `/(tabs)/episodes` | `/(tabs)/locations` | `/_sitemap` | `/characters` | `/episodes` | `/locations`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
