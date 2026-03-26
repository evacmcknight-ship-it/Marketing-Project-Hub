const { jsonResponse, parseJsonBody, requestSupabase } = require("./_shared/utils");
const { normalizeChannels, normalizeTimestamp, sanitizeString } = require("./_shared/records");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "PATCH") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  try {
    const payload = parseJsonBody(event.body);
    const ids = Array.isArray(payload.ids) ? payload.ids.filter(Boolean) : [];
    const changes = payload.changes || {};

    if (ids.length === 0) {
      return jsonResponse(400, { error: "Bulk updates require at least one initiative id." });
    }

    const updateRecord = {
      updated_at: new Date().toISOString(),
    };

    if (changes.owner) {
      updateRecord.owner = sanitizeString(changes.owner);
    }
    if (changes.quarter) {
      updateRecord.quarter = sanitizeString(changes.quarter);
    }
    if (changes.status) {
      updateRecord.status = sanitizeString(changes.status);
    }
    if (Array.isArray(changes.channels) && changes.channels.length > 0) {
      updateRecord.channels = normalizeChannels(changes.channels);
    }
    if (typeof changes.isArchived === "boolean") {
      updateRecord.is_archived = changes.isArchived;
      updateRecord.archived_at = changes.isArchived
        ? normalizeTimestamp(changes.archivedAt) || new Date().toISOString()
        : null;
    }

    const idFilter = ids.join(",");
    const rows = await requestSupabase(`initiatives?id=in.(${idFilter})&select=*`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: updateRecord,
    });

    return jsonResponse(200, { updated: rows.length });
  } catch (error) {
    return jsonResponse(500, { error: error.message });
  }
};
