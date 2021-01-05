export function unique<T>(array: Array<T>): Array<T> {
  return [...new Set(array)];
}

export function objectSortedEntries(obj: {
  readonly [x: string]: unknown;
}): Array<[string, unknown]> {
  return Object.entries(obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
}

export function objectSortedEntriesDeep(object: {
  readonly [x: string]: unknown;
}): Array<[string, unknown]> {
  let sortedEntries = objectSortedEntries(object);
  for (let i = 0; i < sortedEntries.length; i++) {
    sortedEntries[i][1] = sortEntry(sortedEntries[i][1]);
  }
  return sortedEntries;
}

function sortEntry(entry: unknown) {
  if (Array.isArray(entry)) {
    return entry.map(sortEntry);
  }

  if (typeof entry === 'object' && entry != null) {
    return objectSortedEntriesDeep(entry);
  }

  return entry;
}

export function setDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
  let difference = new Set<T>();
  for (let e of a) {
    if (!b.has(e)) {
      difference.add(e);
    }
  }
  return difference;
}
