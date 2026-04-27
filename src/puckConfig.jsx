function clampPath(path) {
  if (!path || path === "/editor") return "/";
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

export const editablePaths = ["/", "/shop", "/product", "/about", "/contact", "/resources"];

export function isEditablePath(path) {
  return editablePaths.includes(clampPath(path));
}

export function pageStorageKey(path) {
  return `ssc-puck-page:${clampPath(path)}`;
}

function richText(text) {
  return text;
}

function createBlock(type, props) {
  return {
    type,
    props: {
      id: `${type}-${Math.random().toString(36).slice(2, 10)}`,
      ...props,
    },
  };
}

function createPage(content) {
  return {
    root: { props: { title: "Session Supply Co." } },
    content,
  };
}

function createNav(pathLabel) {
  return createBlock("GlobalNav", {
    announcement: "Digital tools for facilitators, peer specialists, and program teams",
    brand: "Session Supply Co.",
    links: "Home|/\nShop|/shop\nProduct|/product\nAbout|/about\nContact|/contact\nResources|/resources",
    iconLinks: "",
    actionIcons: "",
    utilityLabel: pathLabel,
  });
}

function createFooter() {
  return createBlock("GlobalFooter", {
    heading: "Calm structure for meaningful sessions.",
    body: "Downloadable session plans, facilitation tools, and practical resources built for real group work.",
    links: "Browse shop|/shop\nAbout the studio|/about\nContact|/contact\nFree resources|/resources",
    note: "Built for practical, people-centered facilitation.",
  });
}

function createHeroBlocks({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return [
    createBlock("HeroContainer", {
      content: [
        createBlock("HeroText", {
          eyebrow,
          text: heading,
          headingLevel: "h1",
          size: "xl",
          align: "left",
          width: "wide",
        }),
        createBlock("HeroText", {
          text: body,
          headingLevel: "p",
          size: "md",
          align: "left",
          width: "wide",
        }),
        createBlock("HeroButtons", {
          primaryLabel,
          primaryHref,
          secondaryLabel,
          secondaryHref,
          align: "left",
        }),
      ],
    }),
  ];
}

export function getDefaultPageData(path) {
  const currentPath = clampPath(path);

  const sharedEnd = [
    createBlock("Testimonials", {
      eyebrow: "Trusted In Practice",
      heading: "Used by facilitators who need confidence, not guesswork.",
      items:
        "Peer Recovery Specialist|I used to rebuild my agenda every week. Now I can open a plan, make light edits, and walk in prepared.\n" +
        "Program Coordinator|The materials feel credible and calm. Staff adoption was easy because the tools are structured without being rigid.\n" +
        "Group Facilitator|The worksheets are clear enough to use right away, and flexible enough to fit our population.",
    }),
    createBlock("ButtonCta", {
      eyebrow: "Ready To Browse",
      heading: "Find the next resource for your next session.",
      body: "Start with a single plan, a facilitator toolkit, or a bundle designed for repeat use.",
      primaryLabel: "Open the shop",
      primaryHref: "/shop",
      secondaryLabel: "Contact us",
      secondaryHref: "/contact",
    }),
    createFooter(),
  ];

  if (currentPath === "/shop") {
    return createPage([
      createNav("Shop"),
      ...createHeroBlocks({
        eyebrow: "Shop Session Materials",
        heading: "Digital products designed to save preparation time.",
        body: "Scan session plans, facilitation tools, and bundles quickly. Every product is structured for immediate use.",
        primaryLabel: "See featured bundle",
        primaryHref: "/product",
        secondaryLabel: "Request a recommendation",
        secondaryHref: "/contact",
      }),
      createBlock("PromoCard", {
        eyebrow: "Featured Bundle",
        title: "Session Plan Starter Library",
        body: "A practical set of foundational plans for peer support groups, psychoeducation circles, and staff-led sessions.",
        detail: "Includes facilitator notes, printable worksheets, and adaptable prompts.",
        ctaLabel: "View bundle",
        ctaHref: "/product",
      }),
      createBlock("PricingGrid", {
        eyebrow: "Browse Products",
        heading: "Clear options for different workloads.",
        plans:
          "Single Session Plan|Focused structure for one topic|$18|1 ready-to-use plan, worksheet, and facilitator notes|Open product|/product\n" +
          "Facilitator Toolkit|Reusable planning and delivery tools|$34|Checklists, debrief prompts, planning templates, and guides|Browse toolkits|/resources\n" +
          "Team Bundle|A broader library for repeat delivery|$79|Multiple plans, printable assets, and coordinator-friendly organization|See bundle|/product",
      }),
      ...sharedEnd,
    ]);
  }

  if (currentPath === "/product") {
    return createPage([
      createNav("Product"),
      ...createHeroBlocks({
        eyebrow: "Product Detail",
        heading: "Session Plan Starter Pack",
        body: "Twelve session plans with printable worksheets, facilitator language, and practical pacing guidance.",
        primaryLabel: "Add to cart",
        primaryHref: "/shop",
        secondaryLabel: "See what is included",
        secondaryHref: "#included",
      }),
      createBlock("ImageTextSplit", {
        eyebrow: "What Is Inside",
        heading: "A complete, ready-to-use pack for real facilitation work.",
        body: "Each session includes an objective, opening script, guided discussion prompts, activity flow, and reflection close. Materials are designed to be edited lightly rather than rebuilt from scratch.",
        side: "right",
        visualLabel: "Preview",
        visualTitle: "Included in the pack",
        visualBody: "12 session plans\n12 printable worksheets\nFacilitator notes\nImplementation tips",
      }),
      createBlock("FeatureList", {
        eyebrow: "Included",
        heading: "Exactly what helps reduce hesitation before purchase.",
        intro: "Everything is organized for quick review, easy adaptation, and confident delivery.",
        items:
          "Session objectives that clarify purpose quickly\n" +
          "Facilitator notes that reduce prep time\n" +
          "Printable worksheets for participant use\n" +
          "Supportive prompts that keep discussion moving\n" +
          "Flexible language that works across different settings",
      }),
      ...sharedEnd,
    ]);
  }

  if (currentPath === "/about") {
    return createPage([
      createNav("About"),
      ...createHeroBlocks({
        eyebrow: "About Session Supply Co.",
        heading: "Structured, intentional tools for facilitators doing meaningful work.",
        body: "We build digital products that reduce prep time while keeping groups calm, credible, and useful.",
        primaryLabel: "Browse products",
        primaryHref: "/shop",
        secondaryLabel: "Contact us",
        secondaryHref: "/contact",
      }),
      createBlock("ImageTextSplit", {
        eyebrow: "Why We Exist",
        heading: "Because the work is demanding, and preparation time is limited.",
        body: "Facilitators often need materials that feel thoughtful without requiring hours of formatting, rewriting, and second-guessing. Session Supply Co. was built to close that gap.",
        side: "left",
        visualLabel: "Approach",
        visualTitle: "Grounded by practice",
        visualBody: "Clarity over clutter\nWarmth without hype\nReal-world pacing\nReusable systems",
      }),
      createBlock("FeatureList", {
        eyebrow: "Values",
        heading: "What guides the work.",
        intro: "Every resource is shaped around practical use in real settings.",
        items:
          "Clear structure that helps facilitators move with confidence\n" +
          "Calm visual language that supports credibility and focus\n" +
          "Flexible tools that can be adapted without starting over\n" +
          "Respect for the time pressure practitioners work under",
      }),
      ...sharedEnd,
    ]);
  }

  if (currentPath === "/contact") {
    return createPage([
      createNav("Contact"),
      ...createHeroBlocks({
        eyebrow: "Contact",
        heading: "Need the right resource for your team or setting?",
        body: "Reach out for recommendations, custom bundle ideas, or questions about how the materials are organized.",
        primaryLabel: "Browse resources",
        primaryHref: "/resources",
        secondaryLabel: "Browse shop",
        secondaryHref: "/shop",
      }),
      createBlock("PromoCard", {
        eyebrow: "Best For",
        title: "Program leads, group facilitators, and peer specialists",
        body: "If you know the kind of group you are running, we can usually point you toward a starting set quickly.",
        detail: "Use this page as a flexible contact landing page until a live form or CRM workflow is added.",
        ctaLabel: "See recommended products",
        ctaHref: "/shop",
      }),
      ...sharedEnd,
    ]);
  }

  if (currentPath === "/resources") {
    return createPage([
      createNav("Resources"),
      ...createHeroBlocks({
        eyebrow: "Resources",
        heading: "Free and low-lift tools that support consistent facilitation.",
        body: "Explore printable guides, planning prompts, and helpful templates designed to make your next session easier to run.",
        primaryLabel: "Browse toolkits",
        primaryHref: "/shop",
        secondaryLabel: "Learn about the studio",
        secondaryHref: "/about",
      }),
      createBlock("PricingGrid", {
        eyebrow: "Resource Library",
        heading: "Start with what you need today.",
        plans:
          "Checklist|Quick-prep planning support|Free|Pre-session readiness checklist, timing prompts, and room setup reminders|Open shop|/shop\n" +
          "Worksheet Pack|Simple printable participant tools|$12|Reflection pages, grounding prompts, and take-home worksheets|View product|/product\n" +
          "Facilitator Guide|Structured support for repeated groups|$24|Session framing notes, transitions, and debrief language|Explore tools|/shop",
      }),
      ...sharedEnd,
    ]);
  }

  return createPage([
    createNav("Home"),
    ...createHeroBlocks({
      eyebrow: "Structured Tools For Facilitators",
      heading: "Run better sessions with materials that are calm, clear, and ready to use.",
      body: "Session Supply Co. creates session plans, facilitator tools, and downloadable resources for peer recovery specialists, group leaders, and program coordinators.",
      primaryLabel: "Browse the shop",
      primaryHref: "/shop",
      secondaryLabel: "Learn about the studio",
      secondaryHref: "/about",
    }),
    createBlock("PromoCard", {
      eyebrow: "Why It Helps",
      title: "Move from planning mode to facilitation mode faster.",
      body: "The products are built to answer two questions quickly: what is this, and how will it help me run a better session?",
      detail: "Expect structured outlines, printable assets, and supportive pacing guidance.",
      ctaLabel: "Explore featured product",
      ctaHref: "/product",
    }),
    createBlock("FeatureList", {
      eyebrow: "What You Can Buy",
      heading: "Built for time-constrained teams who still need polished materials.",
      intro: "Use the collection to support single sessions, recurring groups, or coordinator-led programming.",
      items:
        "Ready-to-use session plans for common facilitation topics\n" +
        "Facilitator tools that reduce prep and delivery friction\n" +
        "Bundles that give teams a reusable starting library\n" +
        "Downloadable resources that stay practical and easy to scan",
    }),
    createBlock("PricingGrid", {
      eyebrow: "Popular Options",
      heading: "Start small or choose a broader library.",
      plans:
        "Starter Plan|A focused single-session resource|$18|One topic-specific session plan with worksheet and facilitator notes|View product|/product\n" +
        "Toolkit Set|Repeat-use facilitation support|$34|Templates, cheat sheets, and planning tools for ongoing groups|Browse toolkits|/resources\n" +
        "Bundle Library|A more complete starting point|$79|A curated set of plans and support materials for teams|See the bundle|/shop",
    }),
    createBlock("ImageTextSplit", {
      eyebrow: "How It Feels",
      heading: "Intentional design that supports credibility without distraction.",
      body: "Whitespace, clear hierarchy, and restrained motion help the site feel grounded while keeping the content easy to scan on both desktop and mobile.",
      side: "right",
      visualLabel: "Preview",
      visualTitle: "Designed for clarity",
      visualBody: "Editorial spacing\nCalm typography\nSubtle motion\nClean comparison layouts",
    }),
    ...sharedEnd,
  ]);
}

function upgradeLegacyBlocks(data) {
  if (!data || !Array.isArray(data.content)) return data;

  let changed = false;
  const nextContent = [];

  for (let i = 0; i < data.content.length; i += 1) {
    const block = data.content[i];

    // Convert prior split hero pattern into one nested hero container.
    const b1 = data.content[i];
    const b2 = data.content[i + 1];
    const b3 = data.content[i + 2];
    if (
      b1?.type === "TextBox" &&
      b2?.type === "TextBox" &&
      b3?.type === "ActionRow" &&
      (b1?.props?.headingLevel === "h1" || b1?.props?.size === "xl")
    ) {
      changed = true;
      nextContent.push(
        createBlock("HeroContainer", {
          content: [
            createBlock("HeroText", {
              eyebrow: b1.props?.eyebrow || "",
              text: b1.props?.text || "",
              headingLevel: b1.props?.headingLevel || "h1",
              size: b1.props?.size || "xl",
              align: b1.props?.align || "left",
              width: b1.props?.width || "wide",
            }),
            createBlock("HeroText", {
              eyebrow: b2.props?.eyebrow || "",
              text: b2.props?.text || "",
              headingLevel: b2.props?.headingLevel || "p",
              size: b2.props?.size || "md",
              align: b2.props?.align || "left",
              width: b2.props?.width || "wide",
            }),
            createBlock("HeroButtons", {
              primaryLabel: b3.props?.primaryLabel || "",
              primaryHref: b3.props?.primaryHref || "#",
              secondaryLabel: b3.props?.secondaryLabel || "",
              secondaryHref: b3.props?.secondaryHref || "#",
              align: b3.props?.align || "left",
            }),
          ],
        }),
      );
      i += 2;
      continue;
    }

    if (block && block.type === "Hero") {
      changed = true;
      const heroProps = block.props || {};
      nextContent.push(
        ...createHeroBlocks({
          eyebrow: heroProps.eyebrow || "",
          heading: heroProps.heading || "",
          body: heroProps.body || "",
          primaryLabel: heroProps.primaryLabel || "",
          primaryHref: heroProps.primaryHref || "#",
          secondaryLabel: heroProps.secondaryLabel || "",
          secondaryHref: heroProps.secondaryHref || "#",
        }),
      );
    } else {
      nextContent.push(block);
    }
  }

  if (!changed) return data;
  return {
    ...data,
    content: nextContent,
  };
}

export function loadPuckDataForPath(path) {
  const currentPath = clampPath(path);
  try {
    const stored = window.localStorage.getItem(pageStorageKey(currentPath));
    if (!stored) return getDefaultPageData(currentPath);
    const parsed = JSON.parse(stored);
    if (parsed && Array.isArray(parsed.content) && parsed.root) {
      const migrated = upgradeLegacyBlocks(parsed);
      if (migrated !== parsed) {
        savePuckDataForPath(currentPath, migrated);
      }
      return migrated;
    }
  } catch {}
  return getDefaultPageData(currentPath);
}

export function savePuckDataForPath(path, data) {
  window.localStorage.setItem(pageStorageKey(path), JSON.stringify(data));
}

function parseLines(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLinkLines(value) {
  return parseLines(value).map((line) => {
    const [label = "", href = "#"] = line.split("|");
    return { label: label.trim(), href: href.trim() || "#" };
  });
}

function parseIconLinkLines(value) {
  return parseLines(value).map((line) => {
    const [icon = "", href = "#", label = ""] = line.split("|");
    const iconKey = icon.trim().toLowerCase();
    const cleanLabel = label.trim() || iconKey || "Link";
    return {
      iconKey,
      href: href.trim() || "#",
      label: cleanLabel,
    };
  });
}

function getHeadingTag(level) {
  if (level === "h1" || level === "h2" || level === "h3") return level;
  return "p";
}

function renderNavIcon(iconKey) {
  const key = (iconKey || "").toLowerCase();

  if (key === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (key === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="6.7" y="9.5" width="2.7" height="7.8" fill="currentColor" />
        <circle cx="8.05" cy="7" r="1.2" fill="currentColor" />
        <path d="M12.3 9.5h2.5v1.1c.5-.8 1.4-1.3 2.5-1.3 2 0 3.2 1.3 3.2 3.7v4.3h-2.7v-3.9c0-1.2-.5-1.8-1.5-1.8-1.1 0-1.8.8-1.8 2v3.7h-2.7z" fill="currentColor" />
      </svg>
    );
  }

  if (key === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M13.8 20v-6h2l.3-2.2h-2.3v-1.4c0-.7.2-1.2 1.2-1.2h1.2V7.2c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.6H9.6V14h1.8v6z" fill="currentColor" />
      </svg>
    );
  }

  if (key === "x" || key === "twitter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 4h4.3l3.8 5.2L16.5 4H20l-6.1 7.1L20 20h-4.3l-4-5.5L7 20H4l6.3-7.4z" fill="currentColor" />
      </svg>
    );
  }

  if (key === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="6" width="18" height="12" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9.5v5l4-2.5z" fill="currentColor" />
      </svg>
    );
  }

  if (key === "mail" || key === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="5.5" width="18" height="13" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4.5 7.5l7.5 5 7.5-5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (key === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.7-.9-2.7-.9-.4-1-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8 0 1.2.8 1.2.8.7 1.1 1.8.8 2.2.6.1-.5.3-.8.5-1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.7.8-2.3-.1-.2-.4-1 .1-2.2 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2 .1 2.2.5.6.8 1.3.8 2.3 0 3.1-1.9 3.8-3.7 4 .3.2.5.7.5 1.4v2c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5z" fill="currentColor" />
      </svg>
    );
  }

  if (key === "cart" || key === "bag") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 7h13l-1.2 7.5a2 2 0 0 1-2 1.7H10a2 2 0 0 1-2-1.6L6.7 8.5H4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10.2" cy="19.2" r="1.3" fill="currentColor" />
        <circle cx="16.2" cy="19.2" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  if (key === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "account" || key === "user") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="8" r="3.3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20c.7-3.2 3.3-5 7-5s6.3 1.8 7 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return <span className="ssc-icon-fallback">{(iconKey || "?").slice(0, 1).toUpperCase()}</span>;
}

function parsePlanLines(value) {
  return parseLines(value).map((line) => {
    const [name = "", subtitle = "", price = "", bullets = "", ctaLabel = "", ctaHref = "#"] = line.split("|");
    return {
      name: name.trim(),
      subtitle: subtitle.trim(),
      price: price.trim(),
      bullets: bullets
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      ctaLabel: ctaLabel.trim(),
      ctaHref: ctaHref.trim() || "#",
    };
  });
}

export const puckConfig = {
  root: {
    fields: {
      title: {
        type: "text",
      },
    },
    render: ({ children }) => <div className="site-canvas">{children}</div>,
  },
  categories: {
    global: {
      title: "Global",
      components: ["GlobalNav", "GlobalFooter"],
    },
    marketing: {
      title: "Sections",
      components: [
        "HeroContainer",
        "TextBox",
        "ActionRow",
        "ButtonCta",
        "PromoCard",
        "FeatureList",
        "Testimonials",
        "PricingGrid",
        "ImageTextSplit",
      ],
    },
  },
  components: {
    GlobalNav: {
      label: "Global Nav",
      fields: {
        announcement: { type: "text" },
        brand: { type: "text" },
        links: { type: "textarea" },
        iconLinks: { type: "textarea" },
        actionIcons: { type: "textarea" },
        utilityLabel: { type: "text" },
      },
      defaultProps: {
        announcement: "Digital tools for facilitators",
        brand: "Session Supply Co.",
        links: "Home|/\nShop|/shop\nAbout|/about",
        iconLinks: "",
        actionIcons: "",
        utilityLabel: "",
      },
      render: ({ announcement, brand, links, iconLinks, actionIcons, utilityLabel }) => (
        <header className="ssc-nav-shell">
          <div className="ssc-announcement">{announcement}</div>
          <nav className="ssc-nav">
            <a href="/" className="ssc-brand">
              {brand}
            </a>
            <div className="ssc-nav-links">
              <div className="ssc-nav-primary">
                {parseLinkLines(links).map((link) => (
                  <a key={`${link.label}-${link.href}`} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="ssc-nav-icons">
                {parseIconLinkLines(iconLinks).map((link) => (
                  <a
                    key={`${link.iconKey}-${link.href}-${link.label}`}
                    href={link.href}
                    className="ssc-nav-icon"
                    aria-label={link.label}
                    title={link.label}
                  >
                    {renderNavIcon(link.iconKey)}
                  </a>
                ))}
              </div>
              <div className="ssc-nav-actions">
                {parseIconLinkLines(actionIcons).map((link) => (
                  <a
                    key={`${link.iconKey}-${link.href}-${link.label}-action`}
                    href={link.href}
                    className="ssc-nav-icon ssc-nav-icon-action"
                    aria-label={link.label}
                    title={link.label}
                  >
                    {renderNavIcon(link.iconKey)}
                  </a>
                ))}
              </div>
              {utilityLabel ? <span className="ssc-nav-utility">{utilityLabel}</span> : null}
            </div>
          </nav>
        </header>
      ),
    },
    HeroContainer: {
      label: "Hero Container",
      fields: {
        content: {
          type: "slot",
          allow: ["HeroText", "HeroButtons"],
        },
      },
      defaultProps: {
        content: [
          {
            type: "HeroText",
            props: {
              eyebrow: "Structured Tools For Facilitators",
              text: "Run better sessions with materials that are calm, clear, and ready to use.",
              headingLevel: "h1",
              size: "xl",
              align: "left",
              width: "wide",
            },
          },
          {
            type: "HeroText",
            props: {
              text: "Session Supply Co. creates session plans, facilitator tools, and downloadable resources for peer recovery specialists, group leaders, and program coordinators.",
              headingLevel: "p",
              size: "md",
              align: "left",
              width: "wide",
            },
          },
          {
            type: "HeroButtons",
            props: {
              primaryLabel: "Browse the shop",
              primaryHref: "/shop",
              secondaryLabel: "Learn about the studio",
              secondaryHref: "/about",
              align: "left",
            },
          },
        ],
      },
      render: ({ content: Content }) => (
        <section className="ssc-section ssc-hero-container">
          <Content className="ssc-hero-slot" />
        </section>
      ),
    },
    HeroText: {
      label: "Hero Text",
      fields: {
        eyebrow: { type: "text" },
        text: { type: "textarea" },
        headingLevel: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "Paragraph", value: "p" },
          ],
        },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
        align: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        width: {
          type: "select",
          options: [
            { label: "Narrow", value: "narrow" },
            { label: "Medium", value: "medium" },
            { label: "Wide", value: "wide" },
            { label: "Full", value: "full" },
          ],
        },
      },
      defaultProps: {
        eyebrow: "",
        text: "Hero text",
        headingLevel: "h2",
        size: "lg",
        align: "left",
        width: "wide",
      },
      render: ({ eyebrow, text, headingLevel, size, align, width }) => {
        const Tag = getHeadingTag(headingLevel);
        return (
          <div className={`ssc-hero-text is-${size} is-${align} is-${width}`}>
            {eyebrow ? <p className="ssc-eyebrow">{eyebrow}</p> : null}
            <Tag className="ssc-text-box-content">{text}</Tag>
          </div>
        );
      },
    },
    HeroButtons: {
      label: "Hero Buttons",
      fields: {
        primaryLabel: { type: "text" },
        primaryHref: { type: "text" },
        secondaryLabel: { type: "text" },
        secondaryHref: { type: "text" },
        align: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        primaryLabel: "Browse shop",
        primaryHref: "/shop",
        secondaryLabel: "Learn more",
        secondaryHref: "/about",
        align: "left",
      },
      render: ({ primaryLabel, primaryHref, secondaryLabel, secondaryHref, align }) => (
        <div className={`ssc-hero-buttons is-${align}`}>
          <div className="ssc-actions">
            {primaryLabel ? (
              <a className="ssc-button" href={primaryHref}>
                {primaryLabel}
              </a>
            ) : null}
            {secondaryLabel ? (
              <a className="ssc-button ssc-button-secondary" href={secondaryHref}>
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      ),
    },
    TextBox: {
      label: "Text Box",
      fields: {
        eyebrow: { type: "text" },
        text: { type: "textarea" },
        headingLevel: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "Paragraph", value: "p" },
          ],
        },
        size: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
        align: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        width: {
          type: "select",
          options: [
            { label: "Narrow", value: "narrow" },
            { label: "Medium", value: "medium" },
            { label: "Wide", value: "wide" },
            { label: "Full", value: "full" },
          ],
        },
      },
      defaultProps: {
        eyebrow: "Text Box",
        text: "Add standalone text boxes and drag them in the Outline panel to change layout flow.",
        headingLevel: "h2",
        size: "md",
        align: "left",
        width: "medium",
      },
      render: ({ eyebrow, text, headingLevel, size, align, width }) => {
        const Tag = getHeadingTag(headingLevel);
        return (
          <section className={`ssc-section ssc-text-box is-${size} is-${align} is-${width}`}>
            {eyebrow ? <p className="ssc-eyebrow">{eyebrow}</p> : null}
            <Tag className="ssc-text-box-content">{text}</Tag>
          </section>
        );
      },
    },
    ActionRow: {
      label: "Action Row",
      fields: {
        primaryLabel: { type: "text" },
        primaryHref: { type: "text" },
        secondaryLabel: { type: "text" },
        secondaryHref: { type: "text" },
        align: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        primaryLabel: "Browse shop",
        primaryHref: "/shop",
        secondaryLabel: "Learn more",
        secondaryHref: "/about",
        align: "left",
      },
      render: ({ primaryLabel, primaryHref, secondaryLabel, secondaryHref, align }) => (
        <section className={`ssc-section ssc-action-row is-${align}`}>
          <div className="ssc-actions">
            {primaryLabel ? (
              <a className="ssc-button" href={primaryHref}>
                {primaryLabel}
              </a>
            ) : null}
            {secondaryLabel ? (
              <a className="ssc-button ssc-button-secondary" href={secondaryHref}>
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </section>
      ),
    },
    Hero: {
      label: "Hero (Legacy Single Block)",
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text" },
        body: { type: "textarea" },
        primaryLabel: { type: "text" },
        primaryHref: { type: "text" },
        secondaryLabel: { type: "text" },
        secondaryHref: { type: "text" },
      },
      defaultProps: {
        eyebrow: "Structured Tools For Facilitators",
        heading: "Run better sessions with clear, ready-to-use materials.",
        body: richText("Session Supply Co. creates practical digital resources for peer specialists and group facilitators."),
        primaryLabel: "Browse shop",
        primaryHref: "/shop",
        secondaryLabel: "Learn more",
        secondaryHref: "/about",
      },
      render: ({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) => (
        <section className="ssc-section ssc-hero">
          <p className="ssc-eyebrow">{eyebrow}</p>
          <h1>{heading}</h1>
          <p className="ssc-lead">{body}</p>
          <div className="ssc-actions">
            <a className="ssc-button" href={primaryHref}>
              {primaryLabel}
            </a>
            <a className="ssc-button ssc-button-secondary" href={secondaryHref}>
              {secondaryLabel}
            </a>
          </div>
        </section>
      ),
    },
    GlobalFooter: {
      label: "Global Footer",
      fields: {
        heading: { type: "text" },
        body: { type: "textarea" },
        links: { type: "textarea" },
        note: { type: "text" },
      },
      defaultProps: {
        heading: "A grounded toolkit for thoughtful sessions.",
        body: "Clear, reusable materials for facilitators and program teams.",
        links: "Shop|/shop\nAbout|/about\nContact|/contact",
        note: "Session Supply Co.",
      },
      render: ({ heading, body, links, note }) => (
        <footer className="ssc-footer">
          <div>
            <p className="ssc-eyebrow">Session Supply Co.</p>
            <h2>{heading}</h2>
            <p className="ssc-muted">{body}</p>
          </div>
          <div className="ssc-footer-links">
            {parseLinkLines(links).map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <p className="ssc-footer-note">{note}</p>
        </footer>
      ),
    },
    ButtonCta: {
      label: "Button / CTA",
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text" },
        body: { type: "textarea" },
        primaryLabel: { type: "text" },
        primaryHref: { type: "text" },
        secondaryLabel: { type: "text" },
        secondaryHref: { type: "text" },
      },
      defaultProps: {
        eyebrow: "Next Step",
        heading: "Choose the resource that matches your next session.",
        body: "Browse the collection and start with something practical.",
        primaryLabel: "Open shop",
        primaryHref: "/shop",
        secondaryLabel: "Contact us",
        secondaryHref: "/contact",
      },
      render: ({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) => (
        <section className="ssc-section ssc-cta-band">
          <p className="ssc-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <p className="ssc-muted">{body}</p>
          <div className="ssc-actions">
            <a className="ssc-button" href={primaryHref}>
              {primaryLabel}
            </a>
            <a className="ssc-button ssc-button-secondary" href={secondaryHref}>
              {secondaryLabel}
            </a>
          </div>
        </section>
      ),
    },
    PromoCard: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        body: { type: "textarea" },
        detail: { type: "textarea" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
      },
      defaultProps: {
        eyebrow: "Featured",
        title: "A practical bundle for your next block of sessions.",
        body: "Use a focused card to highlight a key product or message.",
        detail: "This layout is useful for featured offers, summaries, or reassurance.",
        ctaLabel: "View product",
        ctaHref: "/product",
      },
      render: ({ eyebrow, title, body, detail, ctaLabel, ctaHref }) => (
        <section className="ssc-section">
          <article className="ssc-promo-card">
            <div>
              <p className="ssc-eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
            </div>
            <div>
              <p className="ssc-muted">{body}</p>
              <p className="ssc-muted">{detail}</p>
              <a className="ssc-button" href={ctaHref}>
                {ctaLabel}
              </a>
            </div>
          </article>
        </section>
      ),
    },
    FeatureList: {
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text" },
        intro: { type: "textarea" },
        items: { type: "textarea" },
      },
      defaultProps: {
        eyebrow: "Feature List",
        heading: "A scannable list of benefits or included items.",
        intro: "Keep sections clear and easy to compare.",
        items: "First key point\nSecond key point\nThird key point",
      },
      render: ({ eyebrow, heading, intro, items }) => (
        <section className="ssc-section">
          <p className="ssc-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <p className="ssc-muted ssc-section-intro">{intro}</p>
          <div className="ssc-feature-grid">
            {parseLines(items).map((item) => (
              <article key={item} className="ssc-feature-card">
                <span className="ssc-feature-mark" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      ),
    },
    Testimonials: {
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text" },
        items: { type: "textarea" },
      },
      defaultProps: {
        eyebrow: "Testimonials",
        heading: "Trusted by thoughtful facilitators.",
        items:
          "Peer Recovery Specialist|These materials save me time without flattening the human part of the work.\n" +
          "Program Coordinator|The structure makes implementation easier for staff across different sites.",
      },
      render: ({ eyebrow, heading, items }) => (
        <section className="ssc-section">
          <p className="ssc-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <div className="ssc-testimonial-grid">
            {parseLines(items).map((line) => {
              const [name = "", quote = ""] = line.split("|");
              return (
                <blockquote key={line} className="ssc-testimonial-card">
                  <p>{quote}</p>
                  <footer>{name}</footer>
                </blockquote>
              );
            })}
          </div>
        </section>
      ),
    },
    PricingGrid: {
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text" },
        plans: { type: "textarea" },
      },
      defaultProps: {
        eyebrow: "Pricing Grid",
        heading: "Compare clear options quickly.",
        plans:
          "Starter|A simple entry point|$18|One plan, worksheet, facilitator notes|View|/product\n" +
          "Toolkit|Reusable supports|$34|Templates, guides, planning tools|Browse|/shop",
      },
      render: ({ eyebrow, heading, plans }) => (
        <section className="ssc-section">
          <p className="ssc-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <div className="ssc-pricing-grid">
            {parsePlanLines(plans).map((plan) => (
              <article key={`${plan.name}-${plan.price}`} className="ssc-price-card">
                <p className="ssc-plan-name">{plan.name}</p>
                <h3>{plan.price}</h3>
                <p className="ssc-muted">{plan.subtitle}</p>
                <ul>
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a className="ssc-button" href={plan.ctaHref}>
                  {plan.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </section>
      ),
    },
    ImageTextSplit: {
      label: "Image + Text Split",
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text" },
        body: { type: "textarea" },
        side: {
          type: "select",
          options: [
            { label: "Visual Left", value: "left" },
            { label: "Visual Right", value: "right" },
          ],
        },
        visualLabel: { type: "text" },
        visualTitle: { type: "text" },
        visualBody: { type: "textarea" },
      },
      defaultProps: {
        eyebrow: "Split Section",
        heading: "Pair context with a clean visual preview.",
        body: "Use this block for product previews, explanations, or process sections.",
        side: "right",
        visualLabel: "Preview",
        visualTitle: "Visual panel",
        visualBody: "Calm mockup copy\nLayered supporting details",
      },
      render: ({ eyebrow, heading, body, side, visualLabel, visualTitle, visualBody }) => (
        <section className={`ssc-section ssc-split ${side === "left" ? "is-reversed" : ""}`}>
          <div className="ssc-split-copy">
            <p className="ssc-eyebrow">{eyebrow}</p>
            <h2>{heading}</h2>
            <p className="ssc-muted">{body}</p>
          </div>
          <div className="ssc-visual-card">
            <p className="ssc-eyebrow">{visualLabel}</p>
            <h3>{visualTitle}</h3>
            <div className="ssc-visual-lines">
              {parseLines(visualBody).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>
      ),
    },
  },
};
