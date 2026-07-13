import { app } from '../../api/index';

let ready = false;

export const handler = async (event: any, _context: any) => {
  if (!ready) {
    await app.ready();
    ready = true;
  }

  const url = event.path + (event.rawQuery ? `?${event.rawQuery}` : '');

  const response = await app.inject({
    method: (event.httpMethod || 'GET') as any,
    url,
    headers: event.headers as any,
    payload: event.body || undefined,
  });

  return {
    statusCode: response.statusCode,
    headers: response.headers as Record<string, string>,
    body: response.body,
  };
};
