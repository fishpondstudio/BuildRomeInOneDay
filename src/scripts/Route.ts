import React, { useEffect, useState } from "react";
import { LoadingPage } from "./ui/LoadingPage";
import { TypedEvent } from "./utilities/TypedEvent";

export function Route() {
   const [{ component, params }, setRoute] = useState<RouteChangeEvent>({ component: LoadingPage, params: {} });
   useEffect(() => {
      function handleRouteChanged(e: RouteChangeEvent) {
         setRoute(e);
      }
      RouteChanged.on(handleRouteChanged);
      return () => {
         RouteChanged.off(handleRouteChanged);
      };
   }, []);
   return React.createElement(component, params);
}

export function routeTo<P extends Record<string, unknown>>(component: React.ComponentType<P>, params: P) {
   return RouteChanged.emit({
      component,
      params,
   });
}

export interface RouteChangeEvent {
   component: React.ElementType;
   params: Record<string, unknown>;
}

export const RouteChanged = new TypedEvent<RouteChangeEvent>();
