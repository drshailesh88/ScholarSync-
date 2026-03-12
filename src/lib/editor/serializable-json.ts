export function toSerializableJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
