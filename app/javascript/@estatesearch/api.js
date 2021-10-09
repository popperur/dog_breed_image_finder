export default async function api(url, method, data) {
  let requestUrl = url
  let requestData = data
  if (method === 'GET' && requestData) {
    requestUrl += `?${api.buildParams(requestData)}`
    requestData = null
  }
	// eslint-disable-next-line compat/compat
	const response = await window.fetch(requestUrl, {
		body: requestData ? JSON.stringify(requestData) : null,
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content,
		},
		method,
	})

	if (response.ok) {
		return await response.json()
	} else {
		console.error(await response.text())
		return {
			error: 'Request failed, please see the console for the error message.',
		}
	}
}

api.buildParams = (params) => {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, item)
      }
    } else {
      searchParams.append(key, value)
    }
  })
  return searchParams
}

api.delete = (url) => api(url, 'DELETE', null)

api.get = (url, data) => api(url, 'GET', data)

api.patch = (url, data) => api(url, 'PATCH', data)

api.post = (url, data) => api(url, 'POST', data)

api.put = (url, data) => api(url, 'PUT', data)
