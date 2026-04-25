function loadSorted(modules: Record<string, unknown>): string[] {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url as string)
}

export type SageDirection = "south" | "east" | "north" | "west"

export const sageWalkFrames: Record<SageDirection, string[]> = {
  south: loadSorted(
    import.meta.glob("./walk/south/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
  east: loadSorted(
    import.meta.glob("./walk/east/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
  north: loadSorted(
    import.meta.glob("./walk/north/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
  west: loadSorted(
    import.meta.glob("./walk/west/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
}

export const sageIdleFrames: Record<SageDirection, string[]> = {
  south: loadSorted(
    import.meta.glob("./idle/south/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
  east: loadSorted(
    import.meta.glob("./idle/east/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
  north: loadSorted(
    import.meta.glob("./idle/north/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
  west: loadSorted(
    import.meta.glob("./idle/west/*.png", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ),
}
