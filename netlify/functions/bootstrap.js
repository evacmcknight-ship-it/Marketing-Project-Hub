const { jsonResponse, parseJsonBody, requestSupabase } = require("./_shared/utils");
const { toInitiativeRecord, toRequestRecord } = require("./_shared/records");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  try {
    const payload = parseJsonBody(event.body);
    const initiatives = Array.isArray(payload.initiatives) ? payload.initiatives : [];
    const requests = Array.isArray(payload.requests) ? payload.requests : [];
    const goalsHtml = typeof payload.goalsHtml === "string" ? payload.goalsHtml : "";

    const [existingInitiatives, existingRequests, existingGoals] = await Promise.all([
      requestSupabase("initiatives?select=id&limit=1"),
      requestSupabase("requests?select=id&limit=1"),
      requestSupabase("app_content?key=eq.goals_html&select=key&limit=1"),
    ]);

    if (existingInitiatives.length || existingRequests.length || existingGoals.length) {
      return jsonResponse(409, { error: "Shared workspace already initialized." });
    }

    const initiativeRecords = initiatives.map(toInitiativeRecord);
    const requestRecords = requests.map(toRequestRecord);

    if (initiativeRecords.length) {
      await requestSupabase("initiatives?select=id", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: initiativeRecords,
      });
    }

    if (requestRecords.length) {
      await requestSupabase("requests?select=id", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: requestRecords,
      });
    }

    await requestSupabase("app_content?on_conflict=key&select=key", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: {
        key: "goals_html",
        html: goalsHtml,
        updated_at: new Date().toISOString(),
      },
    });

    return jsonResponse(200, { ok: true });
  } catch (error) {
    return jsonResponse(500, { error: error.message });
  }
};
