export function UserData(id, data){
  id = id ?? '';
  data = data ?? {}

  return {
    id: id,
    userName: data.username ?? '',
    tasks: data.tasks ?? {},
    options: data.options ?? null,
    stats: data.stats ?? null,
  }

}

