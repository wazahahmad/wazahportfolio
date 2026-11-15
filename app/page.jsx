import { connection } from "next/server";
import PortfolioClient from "../components/portfolio-client";

export default async function HomePage() {
  // Render the interactive portfolio at request time so Vercel registers `/`
  // as an application route alongside the static assets.
  await connection();

  return <PortfolioClient />;
}
