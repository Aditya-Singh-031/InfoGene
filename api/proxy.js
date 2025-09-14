export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url param" });
  }

  try {
    // add api_key param if request is going to NCBI
    let finalUrl = targetUrl;
    if (finalUrl.includes("ncbi.nlm.nih.gov")) {
      const joinChar = finalUrl.includes("?") ? "&" : "?";
      finalUrl = `${finalUrl}${joinChar}api_key=${process.env.NCBI_API_KEY}`;
    }

    const response = await fetch(finalUrl);
    const contentType = response.headers.get("content-type");
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType || "text/plain");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}
