import {uid} from "quasar";


export function Task(data) {
  const id = data ? data.id : uid()
  data = data ?? {}

  return {
    id,
    name: data?.name ?? '',
    dueDate: Date.parse(data?.dueDate) || Date.now(),
    img: data?.img ?? '',
    hex: data?.hex ?? ("#" + Math.floor(Math.random()*16777215).toString(16)),
    isCompleted: data?.isCompleted ?? false,
    subtasks: data?.subtasks ?? {},

  }
}
export function Subtask(data){
  const id = data ? data.id : uid()
  return {
    id,
    name: data?.name ?? "",
    pommesNeeded: data?.pommesNeeded ?? 0,
    isComplete: data?.isCompleted ?? false,
  }
}
