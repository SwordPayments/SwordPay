export interface FollowedCreator {
  id: string;
  slug?: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  followedAt: number;
}

const STORAGE_KEY = "sp_followed_creators_v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readFollowedCreators(): FollowedCreator[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FollowedCreator[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item?.id === "string");
  } catch {
    return [];
  }
}

export function writeFollowedCreators(creators: FollowedCreator[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(creators));
}

export function isCreatorFollowed(creatorId: string): boolean {
  return readFollowedCreators().some((creator) => creator.id === creatorId);
}

export function followCreator(creator: Omit<FollowedCreator, "followedAt">) {
  const current = readFollowedCreators();
  const withoutCurrent = current.filter((item) => item.id !== creator.id);
  writeFollowedCreators([
    { ...creator, followedAt: Date.now() },
    ...withoutCurrent,
  ]);
}

export function unfollowCreator(creatorId: string) {
  const current = readFollowedCreators();
  writeFollowedCreators(current.filter((item) => item.id !== creatorId));
}
