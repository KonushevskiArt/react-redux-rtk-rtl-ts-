const mainUrl = 'https://the-one-api.dev/v2';

export const fetchInfoById = async (id: string, typeInfo = 'movie') => {
  const response = await fetch(`${mainUrl}/${typeInfo}/${id}`, {
    headers: {
      Authorization: 'Bearer K6sIfV_qXuXF2K4VT_CB',
    },
  });
  return await response.json();
};

export const fetchInfoByName = async (name: string, typeInfo = 'movie', limit = 10, page = 1) => {
  const response = await fetch(
    `${mainUrl}/${typeInfo}?name=/${name}/i&limit=${limit}&page=${page}`,
    {
      headers: { Authorization: 'Bearer K6sIfV_qXuXF2K4VT_CB' },
    }
  );
  return await response.json();
};

export const fetchInfoByNameWithSort = async (
  name: string,
  typeInfo = 'movie',
  typeSort = 'name',
  limit = 10,
  page = 1
) => {
  const response = await fetch(
    `${mainUrl}/${typeInfo}?name=/${name}/i&limit=${limit}&page=${page}&sort=${typeSort}:asc`,
    {
      headers: { Authorization: 'Bearer K6sIfV_qXuXF2K4VT_CB' },
    }
  );
  return await response.json();
};
