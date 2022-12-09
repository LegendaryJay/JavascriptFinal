export function UserData(id, data) {
  id = id ?? "";
  data = data ?? {};

  return {
    id: id,
    tasks: data.tasks ?? {},
    options: data.options ?? null,

    stats: data.stats ?? null,
  };
}
