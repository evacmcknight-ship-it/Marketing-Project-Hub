const { jsonResponse, parseJsonBody, requestSupabase } = require("./_shared/utils");

const GOALS_RECORD_KEY = "goals_html";

exports.handler = async function handler(event) {
  try {
    switch (event.httpMethod) {
      case "GET": {
        const rows = await requestSupabase(
          `app_content?key=eq.${encodeURIComponent(GOALS_RECORD_KEY)}&select=key,html&limit=1`
        );
        const row = rows[0];
        return jsonResponse(200, {
          key: GOALS_RECORD_KEY,
          html: row?.html || "",
          exists: Boolean(row),
        });
      }

      case "PUT": {
        const payload = parseJsonBody(event.body);
        const html = typeof payload.html === "string" ? payload.html : "";
        const rows = await requestSupabase("app_content?on_conflict=key&select=key,html", {
          method: "POST",
          headers: {
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          body: {
            key: GOALS_RECORD_KEY,
            html,
            updated_at: new Date().toISOString(),
          },
        });

        return jsonResponse(200, {
          key: GOALS_RECORD_KEY,
          html: rows[0]?.html || "",
          exists: true,
        });
      }

      default:
        return jsonResponse(405, { error: "Method not allowed." });
    }
  } catch (error) {
    return jsonResponse(500, { error: error.message });
  }
};
