import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";

export interface SharedResult {
  id: string;
  skillId: string;
  skillName: string;
  input: Record<string, string>;
  output: string;
  createdAt: string;
  expiresAt: string;
  views: number;
}

const SHARE_PREFIX = "share:";
const TTL_DAYS = 30;
const TTL_SECONDS = TTL_DAYS * 24 * 60 * 60;

export async function createShare(
  skillId: string,
  skillName: string,
  input: Record<string, string>,
  output: string
): Promise<string> {
  const id = nanoid(8);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + TTL_SECONDS * 1000);

  const share: SharedResult = {
    id,
    skillId,
    skillName,
    input,
    output,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    views: 0,
  };

  await kv.set(`${SHARE_PREFIX}${id}`, share, { ex: TTL_SECONDS });

  return id;
}

export async function getShare(id: string): Promise<SharedResult | null> {
  const share = await kv.get<SharedResult>(`${SHARE_PREFIX}${id}`);
  
  if (share) {
    // Increment view count (fire and forget)
    kv.set(
      `${SHARE_PREFIX}${id}`,
      { ...share, views: share.views + 1 },
      { ex: TTL_SECONDS }
    ).catch(() => {});
  }

  return share;
}
