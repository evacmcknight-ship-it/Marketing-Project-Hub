function sanitizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUuid(value) {
  const normalized = sanitizeString(value);
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized)
    ? normalized
    : undefined;
}

function normalizeDateString(value) {
  const normalized = sanitizeString(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return null;
  }

  const [year, month, day] = normalized.split("-").map((part) => Number.parseInt(part, 10));
  const candidate = new Date(Date.UTC(year, month - 1, day));
  const isValidDate =
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day;

  return isValidDate ? normalized : null;
}

function normalizeChannels(channels) {
  if (!Array.isArray(channels)) {
    return [];
  }

  return [...new Set(channels.map((channel) => sanitizeString(channel)).filter(Boolean))];
}

function normalizeTimestamp(value) {
  const normalized = sanitizeString(value);
  if (!normalized) {
    return null;
  }

  const timestamp = new Date(normalized);
  return Number.isNaN(timestamp.getTime()) ? null : timestamp.toISOString();
}

function toInitiativeRecord(payload) {
  const name = sanitizeString(payload.name);
  const type = sanitizeString(payload.type);
  const owner = sanitizeString(payload.owner);
  const quarter = sanitizeString(payload.quarter);
  const status = sanitizeString(payload.status);
  const channels = normalizeChannels(payload.channels);
  const startDate = normalizeDateString(payload.startDate);
  const endDate = normalizeDateString(payload.endDate);
  const deadline = normalizeDateString(payload.deadline) || endDate;

  if (!name || !type || !owner || !quarter || !status || channels.length === 0) {
    throw new Error("Initiatives require a name, type, owner, quarter, status, and at least one channel.");
  }

  return {
    id: normalizeUuid(payload.id),
    name,
    type,
    channels,
    owner,
    quarter,
    status,
    deadline,
    start_date: startDate,
    end_date: endDate,
    description: sanitizeString(payload.description),
    is_archived: Boolean(payload.isArchived),
    archived_at: payload.isArchived ? normalizeTimestamp(payload.archivedAt) || new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
}

function fromInitiativeRecord(record) {
  return {
    id: record.id,
    name: record.name,
    type: record.type,
    channels: Array.isArray(record.channels) ? record.channels : [],
    owner: record.owner,
    quarter: record.quarter,
    status: record.status,
    deadline: record.deadline || "",
    startDate: record.start_date || "",
    endDate: record.end_date || "",
    description: record.description || "",
    isArchived: Boolean(record.is_archived),
    archivedAt: record.archived_at || "",
  };
}

function toRequestRecord(payload) {
  const name = sanitizeString(payload.name);
  const requestedBy = sanitizeString(payload.requestedBy);
  const quarter = sanitizeString(payload.quarter);
  const requestedDate = normalizeDateString(payload.requestedDate);
  const neededBy = normalizeDateString(payload.neededBy);
  const channels = normalizeChannels(payload.channels);

  if (!name || !requestedBy || !quarter || !requestedDate || channels.length === 0) {
    throw new Error("Requests require a name, requestor, quarter, requested date, and at least one channel.");
  }

  return {
    id: normalizeUuid(payload.id),
    name,
    requested_by: requestedBy,
    quarter,
    requested_date: requestedDate,
    needed_by: neededBy,
    channels,
    notes: sanitizeString(payload.notes),
    updated_at: new Date().toISOString(),
  };
}

function fromRequestRecord(record) {
  return {
    id: record.id,
    name: record.name,
    requestedBy: record.requested_by,
    quarter: record.quarter,
    requestedDate: record.requested_date || "",
    neededBy: record.needed_by || "",
    channels: Array.isArray(record.channels) ? record.channels : [],
    notes: record.notes || "",
  };
}

module.exports = {
  fromInitiativeRecord,
  fromRequestRecord,
  normalizeChannels,
  normalizeTimestamp,
  sanitizeString,
  toInitiativeRecord,
  toRequestRecord,
};
