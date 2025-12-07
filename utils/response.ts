// utils/response.ts
export function message(content: string) {
  return Response.json({
    type: 4,
    data: { content },
  });
}
