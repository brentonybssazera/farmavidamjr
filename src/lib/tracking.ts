import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "fv_session_id";
const LAST_PATH_KEY = "fv_last_path";

export const getSessionId = (): string => {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      (crypto as any)?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

type EventType =
  | "page_view"
  | "product_view"
  | "add_to_cart"
  | "checkout_start"
  | "pix_generated"
  | "pix_paid"
  | "exit";

const send = (payload: Record<string, unknown>) => {
  // fire-and-forget; nunca bloqueia a UI
  try {
    supabase
      .from("session_events")
      .insert(payload as any)
      .then(() => undefined, () => undefined);
  } catch {
    /* silencioso */
  }
};

const schedule = (fn: () => void) => {
  if (typeof window === "undefined") return;
  const ric = (window as any).requestIdleCallback as
    | ((cb: () => void, opts?: { timeout: number }) => number)
    | undefined;
  if (ric) ric(fn, { timeout: 1500 });
  else setTimeout(fn, 0);
};

export const trackEvent = (
  type: EventType,
  metadata?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;
  const payload = {
    session_id: getSessionId(),
    event_type: type,
    page_path: window.location.pathname + window.location.search,
    metadata: metadata ?? null,
    user_agent: navigator.userAgent,
    referrer: document.referrer || null,
  };
  schedule(() => send(payload));
};

let exitTrackingInstalled = false;

export const installExitTracking = () => {
  if (typeof window === "undefined" || exitTrackingInstalled) return;
  exitTrackingInstalled = true;

  const fireExit = () => {
    const path = window.location.pathname + window.location.search;
    const last = sessionStorage.getItem(LAST_PATH_KEY);
    if (last === `exit:${path}`) return;
    sessionStorage.setItem(LAST_PATH_KEY, `exit:${path}`);
    send({
      session_id: getSessionId(),
      event_type: "exit",
      page_path: path,
      metadata: { visibility: document.visibilityState },
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  };

  window.addEventListener("pagehide", fireExit);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") fireExit();
  });
};