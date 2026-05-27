export async function getJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed.');
    error.details = data.errors || {};
    throw error;
  }

  return data;
}

export function fetchProjects() {
  return getJson('/api/projects');
}

export function submitContact(payload) {
  return getJson('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
