/**
 * Barrel for the content layer — the single source of truth for everything
 * the portfolio displays. UI components import typed data from here and never
 * hardcode copy inline.
 */
export { site } from "./site";
export { navigation } from "./navigation";
export { profile } from "./profile";
export { projects, getProjectBySlug } from "./projects";
export { experience } from "./experience";
export { skills } from "./skills";
export { records } from "./records";
export { contactHeading, contactChannels } from "./contact";
