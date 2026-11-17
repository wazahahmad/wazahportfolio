import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt = "Wazah Ahmad — Senior Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function SocialImage() {
  const portrait = await readFile(
    path.join(process.cwd(), "public/images/social-portrait.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#0f0715",
        color: "white",
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          left: 260,
          top: 20,
          borderRadius: "50%",
          background: "linear-gradient(145deg,#4f268b,#1b1029)",
          border: "2px solid #8750f755",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 165,
          width: 350,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 24, color: "#cbb4ff", marginBottom: 20 }}>
          WAZAH AHMAD
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 53,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <span>Senior Web</span>
          <span>Developer.</span>
        </div>
        <div style={{ fontSize: 20, color: "#c1b7cf", marginTop: 24 }}>
          Websites · AI · Automation
        </div>
      </div>
      <img
        src={"data:image/png;base64," + portrait.toString("base64")}
        width={398}
        height={530}
        style={{
          position: "absolute",
          left: 401,
          bottom: 0,
          objectFit: "contain",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 50,
          top: 190,
          display: "flex",
          flexDirection: "column",
          width: 225,
        }}
      >
        <span style={{ fontSize: 66, fontWeight: 700, color: "#b48aff" }}>
          W / A
        </span>
        <span style={{ fontSize: 19, color: "#ddd", marginTop: 20 }}>
          Thoughtful code.
        </span>
        <span style={{ fontSize: 19, color: "#ddd", marginTop: 6 }}>
          Useful experiences.
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 45,
          fontSize: 19,
          color: "#cbb4ff",
        }}
      >
        wazahahmad.vercel.app
      </div>
    </div>,
    size,
  );
}
