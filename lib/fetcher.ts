//! custom fetch function for fetching data from the server
//! url is the url to fetch from
//! data is the data to send to the server
const fetcher = async (
  url: string,
  data:
    | undefined
    | { email: string; password: string; lastName: string; firstName: string }
) => {
  //! if data is undefined, then we are fetching data from the server
  //! if data is defined, then we are sending data to the server
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    //! stringify the body of the request
    body: JSON.stringify(data)
  })
  if (res.status > 399 && res.status < 200) {
    throw new Error('laa')
  }
  return await res.json()
}

export default fetcher
