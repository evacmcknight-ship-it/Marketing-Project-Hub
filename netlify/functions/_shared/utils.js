function getEnv(name) {
  let value = "";

  if (typeof process !== "undefined" && process.env && process.env[name]) {
    value = process.env[name];
  }

  if (!value && globalThis.Netlify?.env?.get) {
    const fallbackValue = globalThis.Netlify.env.get(name);
    if (fallbackValue) {
      value = fallbackValue;
    }
  }

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

function getSupabaseBaseUrl() {
  const rawValue = getEnv("SUPABASE_URL");

  if (!/^https?:\/\//i.test(rawValue)) {
    throw new Error(
      'SUPABASE_URL must start with "https://". In Netlify, set only the raw project URL, for example "https://your-project.supabase.co".'
    );
  }

  try {
    return new URL(rawValue).toString().replace(/\/$/, "");
  } catch (error) {
    throw new Error(
      `SUPABASE_URL is not a valid URL. In Netlify, set only the raw project URL, not an .env line. Current value: "${rawValue}".`
    );
  }
}

function getSupabaseServiceRoleKey() {
  const rawValue = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (rawValue.includes("=") && !rawValue.startsWith("ey")) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY should be only the raw key value, not something like "SUPABASE_SERVICE_ROLE_KEY=...".'
    );
  }

  return rawValue;
}

function summarizeError(error) {
  const parts = [error?.message].filter(Boolean);
  if (error?.cause?.message) {
    parts.push(`Cause: ${error.cause.message}`);
  }
  return parts.join(" ");
}

function logSupabaseError(context, error) {
  console.error("Supabase request failed", {
    ...context,
    error: error?.message,
    cause: error?.cause?.message || null,
    stack: error?.stack || null,
  });
}

function buildSupabaseUrl(path) {
  return `${getSupabaseBaseUrl()}/rest/v1/${path}`;
}

function parseJsonBody(body) {
  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    throw new Error("Invalid JSON body.");
  }
}

async function requestSupabase(path, { method = "GET", body, headers = {} } = {}) {
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const requestUrl = `${baseUrl}/rest/v1/${path}`;

  let response;
  try {
    response = await fetch(requestUrl, {
      method,
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    logSupabaseError({ method, path, requestUrl }, error);
    throw new Error(`Could not reach Supabase at ${baseUrl}. ${summarizeError(error)}`);
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with status ${response.status}.`);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function buildRequestUrl(event) {
  return new URL(event.rawUrl || `http://localhost${event.path || "/"}`);
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(payload),
  };
}

module.exports = {
  buildRequestUrl,
  buildSupabaseUrl,
  jsonResponse,
  parseJsonBody,
  requestSupabase,
};
