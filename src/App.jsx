import { useEffect, useMemo, useState } from "react";
import { Puck, Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import {
  editablePaths,
  getDefaultPageData,
  isEditablePath,
  loadPuckDataForPath,
  puckConfig,
  savePuckDataForPath,
} from "./puckConfig.jsx";

function normalizePath(pathname) {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function getEditorPath(search) {
  const params = new URLSearchParams(search);
  return normalizePath(params.get("path") || "/");
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function PageSwitcher({ currentPath }) {
  return (
    <label className="ssc-editor-switcher">
      <span>Edit page</span>
      <select
        value={currentPath}
        onChange={(event) => navigateTo(`/editor?path=${encodeURIComponent(event.target.value)}`)}
      >
        {editablePaths.map((path) => (
          <option key={path} value={path}>
            {path === "/" ? "Home" : path.slice(1).replace(/^\w/, (letter) => letter.toUpperCase())}
          </option>
        ))}
      </select>
    </label>
  );
}

function EditorScreen({ currentPath }) {
  const [data, setData] = useState(() => loadPuckDataForPath(currentPath));
  const [status, setStatus] = useState("Local draft autosaves as you edit.");

  useEffect(() => {
    setData(loadPuckDataForPath(currentPath));
    setStatus("Local draft autosaves as you edit.");
  }, [currentPath]);

  function handleChange(nextData) {
    setData(nextData);
    savePuckDataForPath(currentPath, nextData);
    setStatus(`Draft saved for ${currentPath}`);
  }

  async function handlePublish(nextData) {
    savePuckDataForPath(currentPath, nextData);
    setData(nextData);
    setStatus(`Published locally for ${currentPath}`);
  }

  return (
    <div className="ssc-editor-shell">
      <div className="ssc-editor-bar">
        <div>
          <p className="ssc-eyebrow">Puck Editor</p>
          <h1>Session Supply Co. page builder</h1>
        </div>
        <PageSwitcher currentPath={currentPath} />
      </div>
      <p className="ssc-editor-status">{status}</p>
      <div className="ssc-editor-frame">
        <Puck
          key={currentPath}
          config={puckConfig}
          data={data}
          headerTitle={`Editing ${currentPath}`}
          onChange={handleChange}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <main className="ssc-empty-state">
      <p className="ssc-eyebrow">Page Not Found</p>
      <h1>This route is not part of the editable page set.</h1>
      <p className="ssc-muted">
        Use the editor to build one of the configured paths, or return to the home page.
      </p>
      <div className="ssc-actions">
        <a className="ssc-button" href="/">
          Go home
        </a>
        <a className="ssc-button ssc-button-secondary" href="/editor?path=/">
          Open editor
        </a>
      </div>
    </main>
  );
}

export default function App() {
  const [locationState, setLocationState] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  useEffect(() => {
    function handleLocation() {
      setLocationState({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    }

    window.addEventListener("popstate", handleLocation);
    return () => window.removeEventListener("popstate", handleLocation);
  }, []);

  const pathname = useMemo(() => normalizePath(locationState.pathname), [locationState.pathname]);
  const isEditor = pathname === "/editor";
  const currentPath = useMemo(
    () => (isEditor ? getEditorPath(locationState.search) : pathname),
    [isEditor, locationState.search, pathname],
  );

  if (isEditor) {
    return <EditorScreen currentPath={isEditablePath(currentPath) ? currentPath : "/"} />;
  }

  if (!isEditablePath(currentPath)) {
    return <NotFound />;
  }

  return (
    <>
      <a className="ssc-open-editor" href={`/editor?path=${encodeURIComponent(currentPath)}`}>
        Edit this page
      </a>
      <Render config={puckConfig} data={loadPuckDataForPath(currentPath) || getDefaultPageData(currentPath)} />
    </>
  );
}
