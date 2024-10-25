/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/pokemon` | `/(tabs)/rick&morty` | `/(tabs)/starWars` | `/_sitemap` | `/pokemon` | `/rick&morty` | `/starWars`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
