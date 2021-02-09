import { Context, Status } from 'https://deno.land/x/oak/mod.ts';

export async function notFoundMiddleware({ request: { url }, response }: Context) {
  const { NotFound } = Status;

  response.status = NotFound;
  response.type = 'html';
  response.body = `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>${ NotFound } - Not Found</h1>
        <p>URL <code>${ url }</code> not found.</p>
      </body>
    </html>
  `;
}
