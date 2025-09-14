// api/proxy.js

export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url param" });
  }

  try {
    let finalUrl = targetUrl;
    if (finalUrl.includes("ncbi.nlm.nih.gov")) {
      const joinChar = finalUrl.includes("?") ? "&" : "?";
      finalUrl = `${finalUrl}${joinChar}api_key=${process.env.NCBI_API_KEY}`;
    }

    const response = await fetch(finalUrl);
    const contentType = response.headers.get("content-type") || "";

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    // ✅ JSON responses
    if (contentType.includes("application/json")) {
      const json = await response.json();
      return res.status(response.status).json(json);
    }

    // ✅ Non-JSON (PDB, CIF, text, etc.)
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", contentType || "text/plain");
    return res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}
