export default async function handler(req, res) {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: "Missing url param" });
    }
  
    try {
      const response = await fetch(targetUrl);
      const data = await response.text(); // could be JSON or PDB
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    } catch (err) {
      res.status(500).json({ error: "Proxy failed", details: err.message });
    }
  }
  