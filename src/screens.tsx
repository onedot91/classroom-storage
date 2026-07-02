import { useEffect, useMemo, useState } from "react";
import {
  assertNever,
  FIRST_STUDENT_NUMBER,
  formatStudentFolder,
  loadStudentItems,
  STUDENT_COUNT,
  toStudentNumber,
} from "./domain";
import type { LoadState, MaterialItem, StudentNumber } from "./domain";

export function HomePage(props: {
  readonly onSelectStudent: (number: StudentNumber) => void;
}): React.JSX.Element {
  const studentNumbers = useMemo(
    () =>
      Array.from(
        { length: STUDENT_COUNT - FIRST_STUDENT_NUMBER + 1 },
        (_, index) => toStudentNumber(index + FIRST_STUDENT_NUMBER),
      ),
    [],
  ).filter((number): number is StudentNumber => number !== null);

  return (
    <main className="page-shell home-shell">
      <header className="hero">
        <h1>우리 반 저장함</h1>
      </header>
      <section className="number-panel" aria-labelledby="number-heading">
        <h2 id="number-heading">내 번호를 눌러요</h2>
        <div className="number-grid" aria-label="학생 번호">
          {studentNumbers.map((number) => (
            <button
              className="number-button"
              type="button"
              key={number}
              onClick={() => props.onSelectStudent(number)}
            >
              {number}번
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export function StudentPage(props: {
  readonly number: StudentNumber;
  readonly onHome: () => void;
}): React.JSX.Element {
  const [loadState, setLoadState] = useState<LoadState>({ kind: "loading" });
  const folder = formatStudentFolder(props.number);

  useEffect(() => {
    let isActive = true;
    setLoadState({ kind: "loading" });
    loadStudentItems(props.number)
      .then((nextState) => {
        if (isActive) {
          setLoadState(nextState);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && isActive) {
          setLoadState({ kind: "empty" });
        }
      });

    return () => {
      isActive = false;
    };
  }, [props.number]);

  return (
    <main className="page-shell student-shell">
      <nav className="top-actions" aria-label="페이지 이동">
        <button className="secondary-button" type="button" onClick={props.onHome}>
          처음으로
        </button>
      </nav>
      <header className="student-header">
        <p className="site-kicker">{props.number}번 자료</p>
        <h1>사진첩에 저장해요</h1>
      </header>
      <MaterialList folder={folder} loadState={loadState} />
    </main>
  );
}

export function InvalidPage(props: { readonly onHome: () => void }): React.JSX.Element {
  return (
    <main className="page-shell student-shell">
      <section className="empty-panel">
        <h1>0~23번만 선택해요</h1>
        <button className="primary-button" type="button" onClick={props.onHome}>
          처음으로
        </button>
      </section>
    </main>
  );
}

function MaterialList(props: {
  readonly folder: string;
  readonly loadState: LoadState;
}): React.JSX.Element {
  switch (props.loadState.kind) {
    case "loading":
      return <div className="empty-panel">불러오는 중</div>;
    case "empty":
      return <div className="empty-panel">자료 준비 중</div>;
    case "ready":
      return (
        <section className="materials" aria-label="내 자료 목록">
          {props.loadState.items.map((item) => (
            <MaterialCard folder={props.folder} item={item} key={`${item.title}-${item.file}`} />
          ))}
        </section>
      );
    default:
      return assertNever(props.loadState);
  }
}

function MaterialCard(props: {
  readonly folder: string;
  readonly item: MaterialItem;
}): React.JSX.Element {
  const [imageFailed, setImageFailed] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "error">("idle");
  const imagePath = `/students/${props.folder}/${props.item.file}`;

  const handleSave = async (): Promise<void> => {
    setSaveState("saving");
    try {
      await saveImageFile({
        fileName: props.item.file,
        imagePath,
        title: props.item.title,
      });
      setSaveState("idle");
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setSaveState("idle");
        return;
      }
      setSaveState("error");
    }
  };

  return (
    <article className="material-card">
      <h2>{props.item.title}</h2>
      <div className="image-frame">
        {imageFailed ? (
          <p className="image-error">이미지를 불러올 수 없어요.</p>
        ) : (
          <img
            src={imagePath}
            alt={`${props.item.title} 이미지`}
            width="1200"
            height="900"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <button
        className="save-button"
        type="button"
        onClick={() => void handleSave()}
        disabled={saveState === "saving"}
      >
        저장
      </button>
    </article>
  );
}

async function saveImageFile(params: {
  readonly imagePath: string;
  readonly fileName: string;
  readonly title: string;
}): Promise<void> {
  const response = await fetch(params.imagePath);
  if (!response.ok) {
    throw new ImageSaveError(params.imagePath, response.status);
  }

  const blob = await response.blob();
  const file = new File([blob], params.fileName, { type: blob.type || "image/png" });
  const shareData: ShareData = {
    files: [file],
    title: params.title,
  };

  if (navigator.canShare?.(shareData) === true && navigator.share !== undefined) {
    await navigator.share(shareData);
    return;
  }

  downloadImageFile(file);
}

function downloadImageFile(file: File): void {
  const objectUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = file.name;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

class ImageSaveError extends Error {
  constructor(
    readonly imagePath: string,
    readonly status: number,
  ) {
    super(`Failed to load image for saving: ${imagePath} (${status})`);
  }
}
