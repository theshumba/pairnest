type DemoMoment = {
  id: string;
  type: "checkin" | "thought_drop" | "together_timer";
  payload: Record<string, unknown>;
  createdAt: string;
};

type DemoAlbum = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

type DemoVaultItem = {
  id: string;
  albumId?: string | null;
  visibility: "both" | "me_only";
  payload: Record<string, unknown>;
  createdAt: string;
};

type DemoShelfPin = {
  id: string;
  kind: "album" | "item";
  targetId: string;
  createdAt: string;
};

type DemoStore = {
  moments: DemoMoment[];
  albums: DemoAlbum[];
  items: DemoVaultItem[];
  pins: DemoShelfPin[];
  plants: Record<
    string,
    {
      nestId: string;
      plantKey: string;
      stage: "seed" | "sprout" | "leaf" | "bud" | "bloom";
      streakDays: number;
      lastWateredDay: string | null;
      createdAt: string;
      updatedAt: string;
    }
  >;
  dailyActions: Array<{
    nestId: string;
    userId: string;
    day: string;
    action: string;
    createdAt: string;
  }>;
};

const globalStore = globalThis as typeof globalThis & {
  __pnDemoStore?: DemoStore;
};

function getStore(): DemoStore {
  if (!globalStore.__pnDemoStore) {
    globalStore.__pnDemoStore = {
      moments: [],
      albums: [
        {
          id: "album_demo_1",
          title: "First week",
          description: "Tiny wins and firsts.",
          createdAt: new Date().toISOString(),
        },
      ],
      items: [],
      pins: [],
      plants: {},
      dailyActions: [],
    };
  }
  return globalStore.__pnDemoStore;
}

export function addMoment(moment: Omit<DemoMoment, "id" | "createdAt">) {
  const store = getStore();
  const item: DemoMoment = {
    id: `moment_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    ...moment,
  };
  store.moments.unshift(item);
  return item;
}

export function updateMoment(id: string, payload: Record<string, unknown>) {
  const store = getStore();
  const idx = store.moments.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  store.moments[idx] = {
    ...store.moments[idx],
    payload: { ...store.moments[idx].payload, ...payload },
  };
  return store.moments[idx];
}

export function listMoments() {
  const store = getStore();
  return store.moments;
}

export function listAlbums() {
  return getStore().albums;
}

export function addAlbum(data: { title: string; description?: string }) {
  const store = getStore();
  const album: DemoAlbum = {
    id: `album_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title: data.title,
    description: data.description ?? "",
    createdAt: new Date().toISOString(),
  };
  store.albums.unshift(album);
  return album;
}

export function getAlbum(id: string) {
  return getStore().albums.find((a) => a.id === id) ?? null;
}

export function addVaultItem(data: Omit<DemoVaultItem, "id" | "createdAt">) {
  const store = getStore();
  const item: DemoVaultItem = {
    id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    ...data,
  };
  store.items.unshift(item);
  return item;
}

export function listVaultItems() {
  return getStore().items;
}

export function listVaultItemsByAlbum(albumId: string) {
  return getStore().items.filter((i) => i.albumId === albumId);
}

export function listPins() {
  return getStore().pins;
}

export function pinShelf(kind: "album" | "item", targetId: string) {
  const store = getStore();
  const existing = store.pins.find((p) => p.kind === kind);
  if (existing) {
    existing.targetId = targetId;
    return existing;
  }
  const pin: DemoShelfPin = {
    id: `pin_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    kind,
    targetId,
    createdAt: new Date().toISOString(),
  };
  store.pins.push(pin);
  return pin;
}

export function getPlant(nestId: string) {
  const store = getStore();
  if (!store.plants[nestId]) {
    store.plants[nestId] = {
      nestId,
      plantKey: "fern",
      stage: "seed",
      streakDays: 0,
      lastWateredDay: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  return store.plants[nestId];
}

export function updatePlant(nestId: string, data: Partial<ReturnType<typeof getPlant>>) {
  const plant = getPlant(nestId);
  const updated = {
    ...plant,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  const store = getStore();
  store.plants[nestId] = updated;
  return updated;
}

export function addDailyAction(action: { nestId: string; userId: string; day: string; action: string }) {
  const store = getStore();
  const exists = store.dailyActions.find(
    (a) =>
      a.nestId === action.nestId &&
      a.userId === action.userId &&
      a.day === action.day &&
      a.action === action.action
  );
  if (exists) return false;
  store.dailyActions.push({ ...action, createdAt: new Date().toISOString() });
  return true;
}

export function listDailyActions(nestId: string, day: string, action: string) {
  const store = getStore();
  return store.dailyActions.filter((a) => a.nestId === nestId && a.day === day && a.action === action);
}
