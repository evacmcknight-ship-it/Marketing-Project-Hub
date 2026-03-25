const { buildRequestUrl, jsonResponse, parseJsonBody, requestSupabase } = require("./_shared/utils");
const { fromRequestRecord, toRequestRecord } = require("./_shared/records");

exports.handler = async function handler(event) {
  try {
    const requestUrl = buildRequestUrl(event);

    switch (event.httpMethod) {
      case "GET": {
        const rows = await requestSupabase("requests?select=*&order=requested_date.desc");
        return jsonResponse(200, rows.map(fromRequestRecord));
      }

      case "POST": {
        const payload = parseJsonBody(event.body);
        const record = toRequestRecord(payload);
        const rows = await requestSupabase("requests?select=*", {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: record,
        });
        return jsonResponse(201, fromRequestRecord(rows[0]));
      }

      case "DELETE": {
        const id = requestUrl.searchParams.get("id");
        if (!id) {
          return jsonResponse(400, { error: "Missing request id." });
        }

        const rows = await requestSupabase(`requests?id=eq.${encodeURIComponent(id)}&select=*`, {
          method: "DELETE",
          headers: { Prefer: "return=representation" },
        });

        if (!rows.length) {
          return jsonResponse(404, { error: "Request not found." });
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
