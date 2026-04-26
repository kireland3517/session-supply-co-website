## Plan: Full-Freedom Multi-Page Puck Site

Replace the current route rendering with a fully Puck-editable multi-page system, where every page section (including nav and footer) is editable with full freedom. Use per-path page data in localStorage so each route has independent layouts while preserving a local-first workflow.

**Steps**
1. Phase 1: Data model and dependency
2. Add dependency @puckeditor/core in c:/Users/kirel/session-supply-co-website/package.json.
3. Create c:/Users/kirel/session-supply-co-website/src/puckConfig.jsx with:
4. Full block catalog: Global Nav, Global Footer, Hero, Button/CTA, Promo Card, Feature List, Testimonials, Pricing Grid, Image+Text Split.
5. Shared warm/supportive defaults using existing typography and olive/taupe tokens.
6. Per-path storage helpers:
7. pageStorageKey(path) helper (for example ssc-puck-page:/shop).
8. loadPuckDataForPath(path) with safe fallback to defaults.
9. savePuckDataForPath(path, data).
10. getDefaultPageData(path) returning route-specific starter layouts for /, /shop, /product, /about, /contact, /resources.
11. Phase 2: Route and editor architecture
12. Update c:/Users/kirel/session-supply-co-website/src/App.jsx imports to include Puck/Render and puck helpers.
13. Replace existing manual fallback route rendering with Puck rendering for target routes.
14. Introduce editor mode routing:
15. /editor?path=/ => edit home page
16. /editor?path=/shop => edit shop page
17. /editor?path=/product => edit product page
18. /editor?path=/about => edit about page
19. /editor?path=/contact => edit contact page
20. /editor?path=/resources => edit resources page
21. Add a simple page switcher in editor header (Home, Shop, Product, About, Contact, Resources) that updates query param path.
22. Render live page route using <Render config={puckConfig} data={loadPuckDataForPath(currentPath)} />.
21. Ensure nav/footer are Puck blocks on each page and fully editable/removable/reorderable.
22. Keep Builder.io integration disabled for routes now controlled by Puck, unless explicitly re-enabled later.
23. Phase 3: Full editing freedom and styling
24. Ensure no guardrails restrict structure edits: editors can add/remove/reorder any sections on all pages.
25. Update c:/Users/kirel/session-supply-co-website/src/styles.css with minimal classes for all Puck blocks and responsive behavior.
26. Keep visual system aligned with existing Cormorant Garamond + Inter and olive/taupe tokens.
27. Phase 4: Validation
28. Run diagnostics/build checks and fix introduced issues.
29. Manual verification across pages:
30. Edit each page via /editor?path=...
31. Publish and verify route output at /, /shop, /product, /about, /contact, /resources.
32. Refresh browser and confirm each route persists independently.
33. Confirm full freedom operations work on every page: add/remove/move nav, footer, and body sections.

**Relevant files**
- c:/Users/kirel/session-supply-co-website/package.json - add @puckeditor/core.
- c:/Users/kirel/session-supply-co-website/src/puckConfig.jsx - component schema, per-path defaults, per-path persistence.
- c:/Users/kirel/session-supply-co-website/src/App.jsx - editor query-path handling, route rendering switch to Puck, page switcher wiring.
- c:/Users/kirel/session-supply-co-website/src/styles.css - block + layout styles across all editable sections.

**Verification**
1. npm install
2. npm run dev
3. Open /editor?path=/ and confirm full block palette and editing freedom.
4. Switch editor to /shop, /product, /about and confirm independent page content.
5. Publish each page and verify route rendering matches edits.
6. Refresh all routes and verify per-path persistence.
7. Execute structural freedom tests: remove nav/footer on one page, reorder sections, add new blocks, republish.
8. Run diagnostics and npm run build successfully.

**Decisions**
- Scope: Replace existing page rendering with Puck for all target pages (/, /shop, /product, /about, /contact, /resources).
- Multi-page model: Per-path editable pages.
- Permissions: Full freedom everywhere.
- Defaults: Warm/supportive copy, existing typography and color system.
- Persistence: LocalStorage now; API migration later.

**Further Considerations**
1. Optional next step: add version snapshots per path (draft history) to recover from accidental destructive edits.
2. Optional next step: add export/import JSON per page for sharing content between environments.
