const { buildRequestUrl, jsonResponse, parseJsonBody, requestSupabase } = require("./_shared/utils");
const { fromInitiativeRecord, toInitiativeRecord } = require("./_shared/records");

exports.handler = async function handler(event) {
  try {
    const requestUrl = buildRequestUrl(event);

    switch (event.httpMethod) {
      case "GET": {
        const rows = await requestSupabase("initiatives?select=*&order=updated_at.desc");
        return jsonResponse(200, rows.map(fromInitiativeRecord));
      }

      case "POST": {
        const payload = parseJsonBody(event.body);
        const record = toInitiativeRecord(payload);
        const rows = await requestSupabase("initiatives?select=*", {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: record,
        });
        return jsonResponse(201, fromInitiativeRecord(rows[0]));
      }

      case "PATCH": {
        const id = requestUrl.searchParams.get("id");
        if (!id) {
          return jsonResponse(400, { error: "Missing initiative id." });
        }

        const payload = parseJsonBody(event.body);
        const record = toInitiativeRecord({ ...payload, id });
        delete record.id;
        const rows = await requestSupabase(`initiatives?id=eq.${encodeURIComponent(id)}&select=*`, {
          method: "PATCH",
          headers: { Prefer: "return=representation" },
          body: record,
        });

        if (!rows.length) {
          return jsonResponse(404, { error: "Initiative not found." });
        }

        return jsonResponse(200, fromInitiativeRecord(rows[0]));
      }

      case "DELETE": {
        const id = requestUrl.searchParams.get("id");
        if (!id) {
          return jsonResponse(400, { error: "Missing initiative id." });
        }

        const rows = await requestSupabase(`initiatives?id=eq.${encodeURIComponent(id)}&select=*`, {
          method: "DELETE",
          headers: { Prefer: "return=representation" },
        });

        if (!rows.length) {
          return jsonResponse(404, { error: "Initiative not found." });
        }

        return jsonResponse(200, { deleted: true, id });
      }

      default:
        return jsonResponse(405, { error: "Method not allowed." });
    }
  } catch (error) {
    return jsonResponse(500, { error: error.message });
  }
};
