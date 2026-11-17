import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { projects } from "../../../lib/projects";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Wazah Ahmad` : "Project not found" };
}
export default async function ProjectPage({ params }) {
  await connection();
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <main className="project-page">
      <nav className="detail-nav">
        <Link href="/">
          Wazah<span>Dev.</span>
        </Link>
        <Link href="/#portfolio">← All projects</Link>
      </nav>
      <div className="detail-heading">
        <span className="eyebrow">{p.category.toUpperCase()}</span>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div
        className={`detail-image${p.slug === "la-citadelle" ? " detail-image-mobile" : ""}`}
      >
        <Image
          src={p.image}
          alt={`${p.title} website screenshot`}
          width={p.imageWidth}
          height={p.imageHeight}
          priority
          sizes="(max-width: 800px) 100vw, 1100px"
        />
      </div>
      <div className="detail-columns">
        <article>
          <span className="eyebrow">01 / THE EXPERIENCE</span>
          <h2>Project overview.</h2>
          <p>{p.challenge}</p>
        </article>
        <article>
          <span className="eyebrow">02 / THE DETAILS</span>
          <h2>Experience highlights.</h2>
          <p>{p.approach}</p>
        </article>
      </div>
      <div className="detail-actions">
        <a
          className="button primary"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website ↗
        </a>
        <Link className="button secondary" href="/#contact">
          Discuss a project ↗
        </Link>
      </div>
      <footer>© {new Date().getFullYear()} Wazah Ahmad</footer>
    </main>
  );
}
