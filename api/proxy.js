// api/proxy.js

export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url param" });
  }

  try {
    // If calling NCBI, inject your API key from environment variables
    let finalUrl = targetUrl;
    if (finalUrl.includes("ncbi.nlm.nih.gov")) {
      const joinChar = finalUrl.includes("?") ? "&" : "?";
      finalUrl = `${finalUrl}${joinChar}api_key=${process.env.NCBI_API_KEY}`;
    }

    const response = await fetch(finalUrl);

    // Forward upstream status code
    res.status(response.status);

    // Forward headers
    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    // Stream the body directly (works for JSON, text, PDB, CIF, etc.)
    if (response.body) {
      response.body.pipe(res);
    } else {
      const text = await response.text();
      res.send(text);
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}
