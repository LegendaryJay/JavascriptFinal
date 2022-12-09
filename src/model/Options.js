export function Options(data) {
  return {
    preset: data?.preset ?? null,
    presetName: data?.presetName ?? null,
  };
}
