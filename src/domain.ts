export type StudentNumber = number & { readonly __brand: "StudentNumber" };

export type MaterialItem = {
  readonly title: string;
  readonly file: string;
};

export type RouteState =
  | { readonly kind: "home" }
  | { readonly kind: "student"; readonly number: StudentNumber }
  | { readonly kind: "invalid" };

export type LoadState =
  | { readonly kind: "loading" }
  | { readonly kind: "ready"; readonly items: readonly MaterialItem[] }
  | { readonly kind: "empty" };

export const FIRST_STUDENT_NUMBER = 0;
export const STUDENT_COUNT = 23;

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".svg"] as const;

export function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}

export function toStudentNumber(value: number): StudentNumber | null {
  if (Number.isInteger(value) && value >= FIRST_STUDENT_NUMBER && value <= STUDENT_COUNT) {
    return value as StudentNumber;
  }

  return null;
}

export function formatStudentFolder(number: StudentNumber): string {
  return String(number).padStart(2, "0");
}

export function parseRoute(pathname: string): RouteState {
  const match = /^\/student\/(\d{1,2})\/?$/.exec(pathname);

  if (match === null) {
    return pathname === "/" ? { kind: "home" } : { kind: "invalid" };
  }

  const rawNumber = match[1];

  if (rawNumber === undefined) {
    return { kind: "invalid" };
  }

  const studentNumber = toStudentNumber(Number(rawNumber));

  return studentNumber === null
    ? { kind: "invalid" }
    : { kind: "student", number: studentNumber };
}

export async function loadStudentItems(number: StudentNumber): Promise<LoadState> {
  const folder = formatStudentFolder(number);
  const response = await fetch(`/students/${folder}/items.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { kind: "empty" };
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    return { kind: "empty" };
  }

  const items = data.filter(isMaterialItem);

  return items.length === 0 ? { kind: "empty" } : { kind: "ready", items };
}

function isMaterialItem(value: unknown): value is MaterialItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const title = candidate["title"];
  const file = candidate["file"];

  return (
    typeof title === "string" &&
    title.trim().length > 0 &&
    typeof file === "string" &&
    IMAGE_EXTENSIONS.some((extension) => file.toLowerCase().endsWith(extension))
  );
}
