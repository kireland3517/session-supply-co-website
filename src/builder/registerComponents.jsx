import { Builder } from "@builder.io/react";

function Card({ title, description, cta }) {
  return (
    <article className="builder-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button">{cta}</button>
    </article>
  );
}

function SectionTitle({ eyebrow, heading, subheading }) {
  return (
    <header className="builder-section-title">
      <span>{eyebrow}</span>
      <h2>{heading}</h2>
      {subheading ? <p>{subheading}</p> : null}
    </header>
  );
}

export function registerBuilderComponents() {
  Builder.registerComponent(Card, {
    name: "Product Card",
    inputs: [
      { name: "title", type: "string", defaultValue: "Product title" },
      { name: "description", type: "longText", defaultValue: "Description..." },
      { name: "cta", type: "string", defaultValue: "Add to cart" },
    ],
  });

  Builder.registerComponent(SectionTitle, {
    name: "Section Title",
    inputs: [
      { name: "eyebrow", type: "string", defaultValue: "Section" },
      { name: "heading", type: "string", defaultValue: "Heading" },
      { name: "subheading", type: "longText" },
    ],
  });
}
